/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');

///////////////////////////////////////////////////
////// Q11. POST /task_progress
///////////////////////////////////////////////////

module.exports.insertTaskProgress = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Taskprogress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.showDetails = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM taskprogress
    WHERE progress_id = ?
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

///////////////////////////////////////////////////
/////// TO CHECK IF THE USER_ID AND TASK_ID EXIST
//////////////////////////////////////////////////

module.exports.checkUserId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT user_id FROM user
    WHERE user_id = ?
    `
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

module.exports.checkTaskId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT task_id FROM task
    WHERE task_id = ?
    `
    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

///////////////////////////////////////////////////
////// Q12. POST /task_progress/{progress_id}
///////////////////////////////////////////////////
module.exports.selectProgressById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM taskprogress
    WHERE progress_id = ?`

    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

///////////////////////////////////////////////////
////// Q13. PUT /task_progress/{progress_id}
///////////////////////////////////////////////////
module.exports.updateProgress = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE taskprogress
    SET notes = ?
    WHERE progress_id = ?;
    `;

    const VALUES = [ data.notes, data.progress_id];
    
    pool.query(SQLSTATEMENT, VALUES, callback);
};




///////////////////////////////////////////////////
////// Q14. DELETE /task_progress/{progress_id}
///////////////////////////////////////////////////

module.exports.deleteProgressById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM taskprogress
    WHERE progress_id = ?;
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

///////////////////////////////////////////////////
////// No.3. Section B
///////////////////////////////////////////////////
module.exports.deleteProgressByIdForRel = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE taskprogress, userPointsRel
    FROM taskprogress
    LEFT JOIN userPointsRel ON taskprogress.progress_id = userPointsRel.progress_id
    WHERE taskprogress.progress_id = ?;
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectTaskProgressByUser_id = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT Taskprogress.*, Task.* FROM Taskprogress
    JOIN Task ON Task.task_id = Taskprogress.task_id
    WHERE Taskprogress.user_id = ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}
