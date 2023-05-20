import mongoose from 'mongoose';

const volunteerSchema = mongoose.Schema(
  {
    volunteer_name: {
      type: String,
      required: true,
    },
    volunteer_email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    volunteer_phone: {
      type: String,
      required: [true, 'Please enter a valid Phone number'],
    },
    eventid: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
export default Volunteer;
