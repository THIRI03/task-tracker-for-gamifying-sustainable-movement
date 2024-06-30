/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const messagesController = require('../controllers/messagesController');

router.get('/:message_id', messagesController.readMessageById);

///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.get('/', messagesController.readAllMessage);
router.post('/:user_id', messagesController.createMessage, messagesController.getMessageDetails);
router.put('/:message_id/:user_id', messagesController.updateMessageById);
router.delete('/:message_id/:user_id', messagesController.deleteMessageById);


module.exports = router;