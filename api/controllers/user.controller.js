import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import User from '../models/user.model.js';
import { Novu } from '@novu/node';
import ROLES from '../utils/roles.js';

//@desc     Register User
//@route    POST /api/v1/auth/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const novu = new Novu(process.env.NOVU_API_KEY);
  const role = [];

  try {
    //  accept incoming variable
    let { username, email, roles, password, confirm_password, phone } =
      req.body;

    roles.forEach((r) => {
      role.push(parseInt(r));
    });

    //  validate incoming variables
    if (
      !username ||
      !role ||
      !password ||
      !confirm_password ||
      !email ||
      !phone
    ) {
      return res.status(200).json({
        status: false,
        message: 'Please fill out the required fields.',
      });
    }
    //  check if passwords match
    if (password != confirm_password) {
      return res.status(200).json({
        status: false,
        message: 'Password Mismatch',
      });
    }
    //  check if user already exist
    const userExist = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });
    if (userExist) {
      return res.status(200).json({
        status: false,
        message: 'Username or Email address or Phone number already exist.',
      });
    }
    //  hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isAdmin = role.includes(2200);
    //  create new user
    await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      role,
      admin: isAdmin,
    });
    // Send user a welcome email
    const sendEmail = await novu.trigger('on-boarding', {
      to: {
        subscriberId: email,
        email: email,
      },
    });
    if (sendEmail) {
      return res.status(201).json({
        status: true,
        message: 'Registration successfull.',
      });
    }
  } catch (error) {
    return res.status(200).json({
      status: false,
      message: error,
    });
  }
});

//@desc     Login User
//@route    POST /api/v1/auth/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //  check user credentials
  if (!username || !password) {
    return res.status(400).json({
      message: 'Please enter your username or password.',
    });
  }
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const roles = Object.values(user.role);
    generateCookieResponse(
      200,
      res,
      user.id,
      roles,
      user.admin,
      username,
      user.email
    );
  } else {
    return res.status(400).json({
      message: 'Incorrect username or password.',
    });
  }
});

//@desc     GET all registered users / verified accounts / unverified accounts
//@route    GET /api/auth/users
//@access   Private
const registeredUsers = asyncHandler(async (req, res) => {
  try {
    //  select all users except admin
    const allUsers = await User.find({ role: { $ne: ROLES.admin } })
      .sort({ _id: -1 })
      .select('-__v -password');
    if (allUsers) {
      return res.status(200).json({ count: allUsers.length, users: allUsers });
    }
  } catch (error) {
    throw new Error(error);
  }
});
//  Get token from Model and create cookie
const generateCookieResponse = (
  statusCode,
  res,
  userId,
  userRole,
  isAdmin,
  username,
  email
) => {
  const token = generateToken(userId, userRole, isAdmin, username);
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    id: userId,
    isAdmin,
    username,
    email,
  });
};

//  Generate JWT
const generateToken = (id, role, isAdmin, username) => {
  return JWT.sign({ id, role, isAdmin, username }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
};

//  export controllers
export { registerUser, loginUser, registeredUsers };
