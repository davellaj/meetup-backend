import mongoose, { Schema } from 'mongoose';

const MeetupScema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [5, 'Title must be at least 5 characters long'],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description must be at least 10 characters long'],
  },
  eventDate: {
    type: Date,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
}, { timestamps: true });

export default mongoose.model('Meetup', MeetupScema);
