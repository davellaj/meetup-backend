import Group from './model';
import { Meetup } from '../meetups';

export const createGroup = async (req, res) => {
  const {
    name,
    description,
    // category,
  } = req.body;

  if (!name) {
    res.status(400).json({ error: true, message: 'Name must be provided' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: true, message: 'Name must be a string' });
  } else if (name.length < 5) {
    res.status(400).json({ error: true, message: 'Name must be at least 5 characters long' });
  }

  if (!description) {
    res.status(400).json({ error: true, message: 'Description must be provided' });
  } else if (typeof description !== 'string') {
    res.status(400).json({ error: true, message: 'Description must be a string' });
  } else if (description.length < 10) {
    res.status(400).json({ error: true, message: 'Description must be at least 10 characters long' });
  }

  const group = new Group({ name, description });
  try {
    return res.status(201).json({ error: false, group: await group.save() });
  } catch (e) {
    res.status(400).json({ error: true, message: 'error when group was created' });
  }
};

export const createGroupMeetup = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;

  if (!title) {
    res.status(400).json({ error: true, message: 'Title must be provided' });
  } else if (typeof title !== 'string') {
    res.status(400).json({ error: true, message: 'Title must be a string' });
  } else if (title.length < 5) {
    res.status(400).json({ error: true, message: 'Title must be at least 5 characters long' });
  }

  if (!description) {
    res.status(400).json({ error: true, message: 'Description must be provided' });
  } else if (typeof description !== 'string') {
    res.status(400).json({ error: true, message: 'Description must be a string' });
  } else if (description.length < 10) {
    res.status(400).json({ error: true, message: 'Description must be at least 10 characters long' });
  }

  if (!groupId) {
    res.status(400).json({ error: true, message: 'GroupId must be provided' });
  }

  try {
    const { meetup, group } = await Group.addMeetup(groupId, { title, description });
    return res.status(201).json({ error: false, meetup, group });
  } catch (e) {
    res.status(400).json({ error: true, message: 'Meetup could not be created' });
  }
};

export const getGroupMeetups = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(400).json({ error: true, message: 'Group Id required' });
  }
  // search for if group exists
  const group = await Group.findById(groupId);

  if (!group) {
    return res.status(400).json({ error: true, message: 'Group does not exist' });
  }

  try {
    return res.status(200).json({
      error: false,
      meetups: await Meetup.find({ group: groupId }).populate('group', 'name'),
    });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Can not fetch meetup' });
  }
};
