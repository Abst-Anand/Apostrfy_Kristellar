const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { validateSignupData, saveUserData } = require('./middlewares');
import {MongoURL, PORT} from './serverConfig'

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.post('/signup', validateSignupData, saveUserData);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
