/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');

///////////////////////////////////////////////////////
//POST /userPointsRel
///////////////////////////////////////////////////////
module.exports.checkUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE user_id = ?`

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}
//TO CHECK IF THE TASKPROGRESS EXISTS
module.exports.checkProgress = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT progress_id FROM taskprogress
    WHERE progress_id = ? 
    `;

    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}
//TO CHECK IF THE POINT IS CORRECT
module.exports.checkPoints = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT task.points FROM taskprogress 
    INNER JOIN task ON taskprogress.task_id = task.task_id 
    WHERE progress_id = ?
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// To check if the progress_id is already recorded. 
module.exports.checkProgress_idExists = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT progress_id FROM userPointsRel 
    WHERE progress_id = ?
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.addPoints = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO userPointsRel (user_id, progress_id, points)
    VALUES (?, ?, ?);
    `;
    const VALUES = [data.user_id, data.progress_id, data.points];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.showDetails = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM UserPointsRel
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


//error: do not accept when there is no record in the taskprogress

///////////////////////////////////////////////////////
//GET /userPointsRel
///////////////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM userPointsRel
    `;

    pool.query(SQLSTATEMENT, callback);
}
///////////////////////////////////////////////////////
//GET /userPointsRel/id
///////////////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM userPointsRel
    WHERE id = ?
    `;

    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}
///////////////////////////////////////////////////////
//GET /userPointsRel/user_id/totalPoints
///////////////////////////////////////////////////////
module.exports.getTotalPoints = (data, callback) => {
    const SQLSTATEMENT = `
        SELECT user_id, SUM(points) AS totalPoints
        FROM userPointsRel
        WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
};

///////////////////////////////////////////////////////
//PUT /userPointsRel/id
///////////////////////////////////////////////////////
module.exports.updateUserById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE userPointsRel 
    SET user_id = ?
    WHERE id = ?
    `;
    const VALUES = [data.user_id, data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////// UPDATE Progress_id

module.exports.updateProgressId = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE userPointsRel
    SET progress_id = ?, points = ?
    WHERE id = ?;
    `
    const VALUES = [data.progress_id, data.points, data.id];
    pool.query(SQLSTATEMENT, VALUES, callback);

}
///////////////////////////////////////////////////////
//DELETE /userPointsRel/id
///////////////////////////////////////////////////////
module.exports.deleteRelById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM UserPointsRel
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}