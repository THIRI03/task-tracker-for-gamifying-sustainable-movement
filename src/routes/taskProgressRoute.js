/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const taskProgressController = require("../controllers/taskProgressController");


///////////////////////////////////////////////////////////////////////
//CA1
///////////////////////////////////////////////////////////////////////
router.post('/', taskProgressController.checkUserIdExists, taskProgressController.checkTaskIdExists, taskProgressController.insertTaskProgress, taskProgressController.showTaskProgressDetails);
router.get('/:progress_id', taskProgressController.selectProgressById);
router.put('/:progress_id', taskProgressController.updateProgress, taskProgressController.showTaskProgressDetails);
router.delete('/:progress_id', taskProgressController.deleteTaskProgressById);

router.delete('/related/:progress_id', taskProgressController.deleteTaskProgressByIdForB);

///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.get("/:user_id", taskProgressController.getTaskProgressByUserId);

module.exports = router;