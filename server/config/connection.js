require("dotenv").config();
const mongoose = require('mongoose');

// Check if MONGODB_URI is defined in environment variables, otherwise use a default URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/defaultDatabase';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
