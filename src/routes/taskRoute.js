
/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const taskController = require("../controllers/taskController");

///////////////////////////////////////////////////////////////////////
//CA1
///////////////////////////////////////////////////////////////////////
router.post('/', taskController.insertTasks, taskController.showTaskDetails);
router.get('/:task_id', taskController.selectTaskById);
router.put('/:task_id', taskController.updateTaskById, taskController.taskDetails);
router.delete('/:task_id', taskController.deleteTaskById);

///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.get("/", taskController.selectAll);

module.exports = router;