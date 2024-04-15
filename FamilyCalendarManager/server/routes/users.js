import express from 'express';
import { getDB } from '../database.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

export const users = express.Router();

// Sign-In: validate username & password
users.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    // Find the user by username
    const user = await getDB().collection('users').findOne({ username: req.body.username });
    if (!user) {
      return res.json({ message: 'Login failed. User not found.', userId: null });
    }
    console.log('find user');
    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.json({ message: 'Login failed. Incorrect password.', userId: null });
    }

    // Send success response (optionally with token)
    res.json({
      message: 'Login successful',
      userId: user._id,
      name: user.name,
      Email: user.Email,
      people: user.people
    });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server error during authentication.' });
  }
});

// Sign-Up: create new user
users.post('/signup', async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await getDB().collection('users').findOne({ username: req.body.username });
    if (existingUser) {
      return res.json({ message: 'User already exists.', userId: null });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // The number 10 is the number of salt rounds

    // Create a new user instance and save it to the database
    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      name: req.body.name,
      Email: req.body.Email,
      people: req.body.people
    };

    const result = await getDB().collection('users').insertOne(newUser);
    res.json({
      message: 'User successfully created!',
      userId: result.insertedId,
      name: newUser.name,
      Email: newUser.Email,
      people: newUser.people
    });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Server error while creating user.' });
  }
});

// Get user
users.get('/:userId', async (req, res) => {
  try {
    const user = await getDB().collection('users').find({ _id: new ObjectId(req.params.userId) }).toArray();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an existing user
users.post('/', async (req, res) => {
  try {
    let result;
    console.log(JSON.stringify(req.body));
    if (req.body._id === undefined || req.body._id === null || req.body._id === '') {
      console.log("_id cannot be null");
      res.json({ message: "_id cannot be null", isSuccess: false });
      return;
    }
    else {
      const updateData = {
        name: req.body.name,
        Email: req.body.Email,
        people: req.body.people
      };
      console.log(`updateData = ${JSON.stringify(updateData)}`);
      console.log(`filter = ${JSON.stringify({ _id: new ObjectId(req.body._id) })}`);
      result = await getDB().collection('users').updateOne({ _id: new ObjectId(req.body._id) }, { $set: updateData });
      console.log(`result = ${JSON.stringify(result)}`);
    }

    if (result !== undefined && result.acknowledged) {
      res.json({ message: "User successfully updated", isSuccess: true });
    }
    else {
      res.json({ message: 'Failed to update user: ' + JSON.stringify(result), isSuccess: false });
    }
  } catch (err) {
    res.json({ message: err.message, isSuccess: false });
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