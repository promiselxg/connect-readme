import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import { Novu } from '@novu/node';
import Events from '../models/event.model.js';
import Volunteer from '../models/volunteer.model.js';

//@desc     Create new Event
//@route    POST /api/v1/auth/upload
//@access   Private
const createNewEvent = asyncHandler(async (req, res) => {
  const novu = new Novu(process.env.NOVU_API_KEY);
  const {
    title,
    description,
    requires_volunteer,
    image_id,
    image_url,
    created_by,
    email,
  } = req.body;

  try {
    //  poplutate db
    const newEvent = await Events.create({
      created_by,
      title,
      description,
      requires_volunteer,
      image_url,
      image_id,
    });
    // Send user a email
    const sendEmail = await novu.trigger('new-event-notification', {
      to: {
        subscriberId: email,
        email: email,
      },
    });
    if (newEvent && sendEmail) {
      res.status(201).json({
        status: true,
        message: 'New Event created successfully.',
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Get all Events
//@route    GET /api/v1/events
//@access   Public
const getAllEvents = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});

//@desc     Get Single Event
//@route    POST /api/v1/eventid
//@access   Public
const getSingleEvent = asyncHandler(async (req, res) => {
  const { eventid } = req.params;
  if (!eventid) {
    return res.status(400).json({
      status: false,
      message: 'Your request is invalid',
    });
  }
  try {
    const response = await Events.findById(eventid);
    return res.status(200).json({
      status: true,
      response,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: 'Unable to fetch resource',
    });
  }
});

//@desc     Volunteer
//@route    POST /api/v1/events
//@access   Public
const registerVolunter = asyncHandler(async (req, res) => {
  const novu = new Novu(process.env.NOVU_API_KEY);
  const {
    eventid,
    volunteer_name,
    volunteer_phone,
    volunteer_email,
    created_by,
  } = req.body;
  if (!volunteer_name || !volunteer_phone || !volunteer_email || !eventid) {
    return res.json({
      status: false,
      message: 'Please fill out the form',
    });
  }
  try {
    const event = await Events.findById(eventid);
    if (!event) {
      return res.status(404).json({
        status: false,
        message: 'Permission denied',
      });
    }
    const user = await User.findById(created_by);
    const volunteer = await Volunteer.create({
      volunteer_name,
      volunteer_phone,
      volunteer_email,
      eventid,
    });
    // Send user a email
    const sendEmail = await novu.trigger('volunteer', {
      to: {
        subscriberId: user.email,
        email: user.email,
        phone: volunteer_phone,
      },
    });
    if (volunteer && sendEmail) {
      return res.status(200).json({
        status: true,
        message: 'Request submitted successfully',
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

export { createNewEvent, getAllEvents, getSingleEvent, registerVolunter };
