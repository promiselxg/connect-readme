import mongoose from 'mongoose';

const donationSchema = mongoose.Schema(
  {
    amount: {
      type: String,
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
