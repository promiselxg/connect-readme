import express from 'express';
import queryFilter from '../middlewares/query.middleware.js';
import Events from '../models/event.model.js';
import { uploadFile } from '../middlewares/upload.middleware.js';
import Role from '../utils/roles.js';
import {
  createNewEvent,
  getAllEvents,
  getSingleEvent,
  registerVolunter,
} from '../controllers/event.controller.js';

import {
  confirmDonation,
  createPaymentIntent,
} from '../controllers/donation.controller.js';

const router = express.Router();
router.route('/:id/confirm').get(confirmDonation);
router
  .route('/')
  .get(queryFilter(Events, 'created_by', 'email'), getAllEvents)
  .post(registerVolunter);
router.route('/:eventid').get(getSingleEvent);
router.route('/:eventid/donate').post(createPaymentIntent);

router.route('/upload').post(uploadFile.single('file'), createNewEvent);

export default router;
