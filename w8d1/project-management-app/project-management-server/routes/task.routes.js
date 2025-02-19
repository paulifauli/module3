const router = require("express").Router();
// const mongoose = require('mongoose');
 
const Task = require('../models/Task.model');
const Project = require('../models/Project.model');
 
//  POST /api/tasks  -  Creates a new task
router.post('/tasks', (req, res, next) => {
  const { title, description, projectId } = req.body;
 
  Task.create({ title, description, project: projectId })
    .then(newTask => {
      return Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id } }, {new: true} );
    })
    .then(project => res.json(project))
    .catch(err => res.json(err));
});
 
module.exports = router;