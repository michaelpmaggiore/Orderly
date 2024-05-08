import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import mongoose from 'mongoose';

// // Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/OrderlyDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error', err));

  const ClassSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    class_name: {
        type: String,
        required: true,
    },
    class_code: {
        type: String,
        required: true,
    },
    crn: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    days: {
        mon: Boolean,
        tue: Boolean,
        wed: Boolean,
        thu: Boolean,
        fri: Boolean,
        sat: Boolean,
        sun: Boolean,
    }
});

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    user_id: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    classes: [ClassSchema]
});

const User = mongoose.model('User', UserSchema);
const Class = mongoose.model('Class', ClassSchema);

const port = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Backend is working');
  });

app.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && user.password === req.body.password) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.post('/schedule/new', async (req, res) => {
    const user = await User.findById(req.body.userId).catch(e => console.error(e));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const classItem = new Class({
      class_name: req.body.class_name,
      class_code: req.body.class_code,
      crn: req.body.crn,
      instructor: req.body.instructor,
      time: req.body.time,
      days: req.body.days,
    });
    user.classes.push(classItem);
    await user.save();
    res.status(201).json(classItem);
  });

app.get('/schedule/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId).catch(e => console.error(e));
    res.json(user.classes);
    console.log(user) // print for debugging for json format of user and classes.
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
});

app.listen(port, () => {
    console.info(`Server is running at http://localhost:${port}/login`)
});