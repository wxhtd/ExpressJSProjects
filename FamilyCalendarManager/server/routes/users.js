import express from 'express';
import { getDB } from '../database.js';
import { ObjectId } from 'mongodb';

export const users = express.Router();

// Get all users
users.get('/:userId', async (req, res) => {
  try {
    const user = await getDB().collection('users').find({ _id: new ObjectId(req.params.userId) }).toArray();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new user or update an existing user
users.post('/', async (req, res) => {
  try {
    let result;
    if (req.body._id !== undefined && req.body._id !== null)
      result = await getDB().collection('users').insertOne(req.body);
    else
      result = await getDB().collection('users').updateOne({ _id: req.body._id }, req.body);

    if (result !== undefined && result.acknowledged) {
      user._id = result.insertedId | result.upsertedId;
      res.status(200).json(user);
    }
    else {
      res.json({ message: 'Failed to create/update user: ' + JSON.stringify(result) });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
users.delete('/:id', async (req, res) => {
  try {
    const result = await getDB().collection('users').deleteOne({ _id: new ObjectId(req.params.userId) });
    if (result !== undefined && result.acknowledged) {
      console.log(`deletedCount = ${result.deletedCount}`)
      res.json({ message: 'Deleted User' });
    }
    else {
      res.json({ message: 'Failed to delete user: ' + JSON.stringify(result) });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});