const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const tasksRouter = require('./routes/tasks');



mongoose.connect('mongodb://localhost:27017/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
