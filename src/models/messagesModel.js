/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');
const { Module } = require('module');

//////////////////////////////////////////////////////
// GET /messages
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Messages
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////////////
// GET /message/:message_id
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE message_id = ?;
    `;
    const VALUES = [data.message_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// CREATE /message
//////////////////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Messages (user_id, sent_by, message_text)
    VALUES (?, (SELECT username FROM User WHERE user_id = ?), ?);
    `;

    const VALUES = [data.user_id, data.user_id, data.message_text];

    pool.query(SQLSTATEMENT, VALUES, callback);
};


//////////////////////////////////////////////////////
// GET /message
//////////////////////////////////////////////////////
//TO GET THE DETAILS OF THE INSERTED MESSAGE

module.exports.getMessageDetails = (data, callback) => {
    const SQLSTATEMENT =`
    SELECT * FROM Messages
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);

}

//////////////////////////////////////////////////////
// UPDATE /message/:message_id
//////////////////////////////////////////////////////
module.exports.updateMessageById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Messages
    SET message_text = ?
    WHERE message_id = ?
    `;
    const VALUES = [data.message_text, data.message_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// UPDATE /message/:message_id
//////////////////////////////////////////////////////
module.exports.deleteMessageById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM Messages
    WHERE message_id = ?
    `;
    const VALUES = [data.message_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};