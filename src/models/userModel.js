/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');
const { validateHeaderName } = require('http');

module.exports.showDetails = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT user_id, username, email FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}



//////////////////////////////////////////////
// check if the user exists
///////////////////////////////////////////////

module.exports.checkEmail = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE email = ?;
    `;
    const VALUES = [data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//get all

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    `;

    pool.query(SQLSTATEMENT, callback);
}

//get user by id
module.exports.selectByUserId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT User.*, SUM(points) AS total_points FROM taskprogress 
    INNER JOIN User ON taskprogress.user_id = User.user_id 
    INNER JOIN Task ON taskprogress.task_id = Task.task_id
    WHERE User.user_id = ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//check username an email

module.exports.checkUserAndEmail = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT username, email FROM USER
    WHERE username = ? OR email = ?
    `;

    const VALUES = [data.username, data.email];

    pool.query(SQLSTATEMENT, VALUES, callback);
};


//update user by id
module.exports.updateUserByid = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.username, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);

}



module.exports.updatedUserDetailsbyId = (data, callback) => {
    const SQLSTATMENT = `
    SELECT user_id, username, email FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//delete

module.exports.deleteUserByid = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE User, taskprogress
    FROM User
    LEFT JOIN taskprogress ON User.user_id = taskprogress.user_id
    WHERE User.user_id = ?;

    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

/////////////////////////////////////////
//SECTION B
///////////////////////////////////////
module.exports.deleteUserRelatedById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE User, taskprogress, ownership, userPointsRel, userRewardsRel
    FROM User
    LEFT JOIN taskprogress ON User.user_id = taskprogress.user_id
    LEFT JOIN ownership ON User.user_id = ownership.user_id
    LEFT JOIN userPointsRel ON User.user_id = userPointsRel.user_id
    LEFT JOIN userRewardsRel ON User.user_id = userRewardsRel.user_id
    WHERE User.user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

////////////////////////////////////////////////////////////////////
//For User Register
////////////////////////////////////////////////////////////////////
module.exports.createNewUser = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectUserByUserNameOrEmail = (data, callback) => {
    const SQLSTATEMENT  = `
    SELECT username, email FROM User
    WHERE username = ? OR email = ?
    `
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkEmailAndPassword = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT user_id, email, password FROM User 
    WHERE email = ? OR password = ?
    `
    const VALUES  = [data.email, data.password];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SAMPLE
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// GET MESSAGES BY USER_ID
//////////////////////////////////////////////////////
module.exports.selectMessagesById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Messages 
    WHERE user_id = ?
    `
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}
