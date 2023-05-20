import mongoose from 'mongoose';

const donationSchema = mongoose.Schema(
  {
    sender_email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    amount: {
      type: String,
      unique: true,
    },
    currency: {
      type: String,
    },
    event_id: {
      type: mongoose.Schema.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
