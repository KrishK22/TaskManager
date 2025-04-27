import express from 'express'
import { addTask, deleteTask, getTask } from '../controllers/taskController.js';

const router = express.Router()


router.post('/addtask', addTask)
router.delete('/deletetask/:id', deleteTask)
router.get('/gettask', getTask)




export default router;