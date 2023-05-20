import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  registeredUsers,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { verifyUserRoles } from '../middlewares/role.middleware.js';
import ROLES from '../utils/roles.js';

// Mount Routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router
  .route('/users')
  .get(verifyToken, verifyUserRoles(ROLES.admin), registeredUsers);
export default router;
