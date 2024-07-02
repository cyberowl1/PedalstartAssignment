const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate
  });
  console.log(task)
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a task by ID
router.get('/:id', getTask, (req, res) => {
  console.log("Inside task fetching")
 
  res.json(res.task);
});

// Update a task
router.put('/:id', getTask, async (req, res) => {
  if (req.body.title != null) {
    res.task.title = req.body.title;
  }
  if (req.body.description != null) {
    res.task.description = req.body.description;
  }
  if (req.body.dueDate != null) {
    res.task.dueDate = req.body.dueDate;
  }
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
router.delete('/:id', getTask, async (req, res) => {
  try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
    res.json({ message: 'Deleted Task' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
  console.log("Inside getTask middleware");
  console.log("Request Params:", req.params.id); // Log request params to debug
  let task;
  try {
    
    task = await Task.findById(req.params.id)
    console.log(task)
    if (task == null) {
      console.log("Task not found returning message")
      return res.status(404).json({ message: 'Cannot find task' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.task = task;
  next();
}

module.exports = router;
