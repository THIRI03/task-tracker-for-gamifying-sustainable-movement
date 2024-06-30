/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { error } = require('console');
const model = require('../models/messagesModel.js');


///////////////////////////////////////////////////
//POST /message
///////////////////////////////////////////////////
module.exports.createMessage = (req, res, next) => {
    if (req.body.message_text == undefined || req.body.message_text == "") {
        res.status(400).send("Error: message_text is undefined");
        return;
    }
    else if (req.body.user_id == undefined) {
        res.status(400).send("Error: user_id is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        message_text: req.body.message_text
    }

    console.log("data", data);

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createMessage:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }

    model.insertSingle(data, callback);
}

///////////////////////////////////////////////////
//SHOW THE DETAILS
///////////////////////////////////////////////////
module.exports.getMessageDetails = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getMessageDetails:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results[results.length-1]);
        }
    }

    model.getMessageDetails(data, callback);
}

///////////////////////////////////////////////////
//GET /message
///////////////////////////////////////////////////
module.exports.readAllMessage = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllMessage:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectAll(callback);
}

///////////////////////////////////////////////////
//GET /message/message_id
///////////////////////////////////////////////////
module.exports.readMessageById = (req, res, next) => {
    const data = {
        message_id: req.params.message_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readMessageById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

///////////////////////////////////////////////////
//UPDATE /message/message_id
///////////////////////////////////////////////////
module.exports.updateMessageById = (req, res, next) => {
    if (req.params.message_id == undefined) {
        res.status(400).send("Error: message_id is undefined");
        return;
    }
    else if (req.body.message_text == undefined || req.body.message_text == "") {
        res.status(400).send("Error: message_text is undefined or empty");
        return;
    }
    else if (req.params.user_id == undefined) {
        res.status(400).send("Error: userId is undefined");
        return;
    }

    const data = {
        message_id: req.params.message_id,
        user_id: req.params.user_id,
        message_text: req.body.message_text
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.updateMessageById(data, callback);
}

///////////////////////////////////////////////////
//DELETE /message/message_id
///////////////////////////////////////////////////
module.exports.deleteMessageById = (req, res, next) => {
    const data = {
        message_id: req.params.message_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteMessageById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.deleteMessageById(data, callback);
}