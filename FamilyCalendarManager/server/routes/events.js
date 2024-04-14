import express from 'express';
import { getDB } from '../database.js';

export const events = express.Router();

// Get all events for a user
events.get('/:userId', async (req, res) => {
  try {
    const events = await getDB().collection('events').find({ user: req.params.userId }).toArray();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new event
events.post('/', async (req, res) => {
  let result;
  const event = req.body;
  console.log('get post request');
  try {
    console.log(`event = ${JSON.stringify(event)}}`);
    console.log(event._id);
    if (event._id !== undefined && event._id !== null) {
      console.log('update');
      result = await getDB().collection('events').updateOne({ _id: event._id }, req.body);
    }
    else {
      console.log('insert');
      result = await getDB().collection('events').insertOne(event);
    }
    if (result !== undefined && result.acknowledged) {
      event._id = result.insertedId || result.upsertedId;
      res.status(200).json(event);
    }
    else {
      res.json({ message: 'Failed to create/update event: ' + JSON.stringify(result) });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});


// Delete an event
events.delete('/:id', async (req, res) => {
  try {
    const result = await getDB().collection('events').deleteOne({ _id: req.params.id });
    if (result !== undefined && result.acknowledged) {
      res.json({ message: 'Deleted event' });
    }
    else {
      res.json({ message: 'Failed to delete event: ' + JSON.stringify(result) });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});