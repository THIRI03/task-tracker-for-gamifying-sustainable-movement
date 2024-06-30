/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");

///////////////////////////////////////////////////////////////////////
//CA1
///////////////////////////////////////////////////////////////////////
router.post('/', userController.checkEmailById, userController.createNewUser, userController.showUserDetails);

///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.get("/:user_id/message", userController.readMessagesById);
router.put("/:user_id", userController.updateUserById, userController.updatedUserDetails);
router.get("/:user_id/points", userController.readUserById);
router.get("/:user_id", userController.readUserById);
router.delete("/:user_id", userController.deleteUserRelated);

module.exports = router;
