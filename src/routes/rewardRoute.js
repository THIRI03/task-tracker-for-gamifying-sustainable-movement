/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const rewardController = require("../controllers/rewardController");

///////////////////////////////////////////////////////////////////////
//CA1
///////////////////////////////////////////////////////////////////////
router.post('/', rewardController.checkRewardExists, rewardController.insertNew, rewardController.showDetails)
router.get('/:reward_id', rewardController.readRewardById);
router.delete('/:reward_id', rewardController.deleteRewardById);
router.put('/:reward_id', rewardController.checkRewardExists, rewardController.updateRewardById, rewardController.showUpdatedDetails);

///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.get("/", rewardController.readAll);

module.exports = router;
