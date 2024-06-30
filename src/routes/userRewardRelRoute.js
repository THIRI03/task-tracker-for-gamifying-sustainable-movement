/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const userRewardRelController = require("../controllers/userRewardRelController");

///////////////////////////////////////////////////////////////////////
//CA1
///////////////////////////////////////////////////////////////////////
router.post('/', userRewardRelController.checkUser_id, userRewardRelController.checkReward_id, userRewardRelController.createNewRel, userRewardRelController.showRelDetails);
router.get('/', userRewardRelController.selectAll);
router.get('/:userReward_id', userRewardRelController.selectRelbyId);
router.get('/user_id/:user_id', userRewardRelController.getRelByUser_id);
router.put('/:userReward_id', userRewardRelController.checkUser_id, userRewardRelController.checkReward_id, userRewardRelController.updateRelbyId, userRewardRelController.showRelDetailsForUpdate);
router.delete('/:userReward_id', userRewardRelController.deleteRelById);

///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.get("/:user_id", userRewardRelController.getUserRewardDetailsByUser_id)

module.exports = router;