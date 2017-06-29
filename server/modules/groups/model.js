import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Name must be 5 characters long'],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description must be 10 characters long'],
  },
  category: {
    type: String,
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup',
  }],
}, { timestamps: true });

// create meetup and add it to the meetups array in the group
GroupSchema.statics.addMeetup = async function (id, args) {
  const Meetup = mongoose.model('Meetup');

  // add group id to the meetup group element,
  // this is the author of the meetup
  const meetup = await new Meetup({ ...args, group: id });
  // find group with id provided in the url
  // push the meetup id into the meetups element
  const group = await this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } });

  return {
    meetup: await meetup.save(),
    group,
  };
};

export default mongoose.model('Group', GroupSchema);
