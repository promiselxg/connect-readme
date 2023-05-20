import mongoose from 'mongoose';

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
      unique: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: [true, 'Please enter a description'],
    },
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    image_url: {
      type: String,
      required: [true, 'Please select an Image'],
    },
    image_id: {
      type: String,
    },
    requires_volunteer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);
export default Event;
