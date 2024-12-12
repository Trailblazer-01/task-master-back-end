const express = require('express')
const router = express.Router()
const Tasks = require('../models/task')
const {verifyToken} = require('./auth')
const {checkSchema} = require('express-validator')
const {taskValidation, validateRequest} = require('../validation.js')

const {getAllTasks, updateProperty, createNewTask, deleteSingleTask, deleteAllTasks} = require('../controllers/taskController')

router.get('/tasks/all',verifyToken,getAllTasks)

router.post('/tasks/create', verifyToken,checkSchema(taskValidation),validateRequest, createNewTask)

router.delete('/tasks/dropone/:id', verifyToken, deleteSingleTask)

router.patch('/tasks/edit/:id', verifyToken,checkSchema(taskValidation),validateRequest,updateProperty)

router.delete('/tasks/dropall', verifyToken, deleteAllTasks)


module.exports = router
