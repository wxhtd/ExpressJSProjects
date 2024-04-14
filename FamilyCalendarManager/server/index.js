import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import {users} from './routes/users.js';
import {events} from './routes/events.js';
import {connectToDB} from './database.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/events', events);
connectToDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});