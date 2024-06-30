/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const userPointsRelController = require("../controllers/userPointsRelController");

///////////////////////////////////////////////////////////////////////
//CA1
///////////////////////////////////////////////////////////////////////
router.post('/', userPointsRelController.checkUserExists, userPointsRelController.checkTaskProgress, userPointsRelController.checkPoints, userPointsRelController.addNewPoints, userPointsRelController.showPointsDetails);
router.get('/', userPointsRelController.readAllRel);

router.get('/:id', userPointsRelController.readRelById);
router.get('/:user_id/totalPoints', userPointsRelController.showTotalPoints);
router.delete('/:id', userPointsRelController.deleteRelById);
router.put('/user_id/:id', userPointsRelController.checkUserExistsForUpdate, userPointsRelController.updateUser_IdById, userPointsRelController.showPointsDetailForUpdate);
router.put('/progress_id/:id', userPointsRelController.checkTaskProgressForUpdate, userPointsRelController.checkPoints, userPointsRelController.checkProgressIdExists, userPointsRelController.updateProgressIdById, userPointsRelController.showPointsDetailForUpdate);


///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.get("/:user_id", userPointsRelController.showTotalPoints);

module.exports = router;
