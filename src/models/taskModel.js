/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');

//6. POST
module.exports.insertNewTask = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.title, data.description, data.points];

pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.showDetailsOfTask = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT task_id, title, description, points FROM Task
    WHERE task_id = ?;
    `;
const VALUES = [data.task_id, data.title, data.description, data.points];

pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.getAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM TASK
    `;
    pool.query(SQLSTATEMENT, callback);
}

module.exports.selectByTaskId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.updateTaskByid = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Task
    SET title = ? , description = ? , points = ? 
    WHERE task_id = ?;
    `;
    const VALUES = [data.title, data.description, data.points, data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

module.exports.getTaskDetails = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Task
    WHERE task_id = ?; 
    `
    const VALUES = [data.task_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE task, taskprogress
    FROM task
    LEFT JOIN taskprogress ON task.task_id = taskprogress.task_id
    WHERE task.task_id = ?;
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


