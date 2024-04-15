import express from 'express';
import { getDB } from '../database.js';
import { ObjectId } from 'mongodb';

export const events = express.Router();

// Get all events for a user
events.get('/:userId', async (req, res) => {
  try {
    console.log(req.params.userId);
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
  const {_id, ...updateData} = event;
  console.log('get post request');
  try {
    console.log(`event = ${JSON.stringify(event)}}`);
    console.log(event._id);
    if (event._id !== undefined && event._id !== null) {
      console.log('update');
      console.log(`filter=${JSON.stringify({ _id: new ObjectId(event._id) })}`);
      result = await getDB().collection('events').updateOne({ _id: new ObjectId(event._id) }, { $set: updateData });
    }
    else {
      console.log('insert');
      result = await getDB().collection('events').insertOne(updateData);
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
    console.log(`delete params = ${req.params}`);
    console.log(`id = ${req.params.id}`);
    const result = await getDB().collection('events').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result !== undefined && result.acknowledged) {
      console.log(JSON.stringify(result));
      res.json({ message: 'Deleted event' });
    }
    else {
      res.json({ message: 'Failed to delete event: ' + JSON.stringify(result) });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});