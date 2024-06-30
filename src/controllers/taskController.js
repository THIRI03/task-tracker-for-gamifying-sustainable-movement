/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const model = require('../models/taskModel.js');


///////////////////////////////////////////////////
////// Q6. POST /tasks
///////////////////////////////////////////////////

module.exports.insertTasks = (req, res, next) => {
    if (req.body.title == undefined ||
        req.body.description == undefined ||
        req.body.points == undefined) {
        res.status(400).json({
            message: "Missing title or description or points."
        })
    }
    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error insertTasks: ", error);
            res.status(500).json(error);
        } else {
            res.locals.task_id = results.insertId;
            req.params.task_id = results.insertId;
            next();
        }
    }
    model.insertNewTask(data, callback)
}

// TO GET THE TASK's DETAILS INCLUDING THE task_id
module.exports.showTaskDetails = (req, res, next) => {
    const data = {
        task_id: res.locals.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error showTaskDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(201).json(
                results[0]
            );
        }
    }
    model.showDetailsOfTask(data, callback)
}

///////////////////////////////////////////////////
////// Q7. GET /tasks
///////////////////////////////////////////////////

module.exports.selectAll = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectAll: ", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.getAll(callback);
}


///////////////////////////////////////////////////
////// Q8. GET /tasks/{task_id}
///////////////////////////////////////////////////

module.exports.selectTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectTaskById: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "task_id does not exist."
                });
            } else {
                res.status(200).json(results[0]);
            }
            // next();
        }
    }
    model.selectByTaskId(data, callback);
}

///////////////////////////////////////////////////
////// Q9. PUT /tasks/{task_id}
///////////////////////////////////////////////////

module.exports.updateTaskById = (req, res, next) => {
    if (req.body.title == undefined ||
        req.body.description == undefined ||
        req.body.points == undefined) {
        res.status(400).json({
            message: "Missing title or description or points."
        })
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "task_id does not exist."
                });
                return;
            } else {
                next();
            }
        }
    }

    model.updateTaskByid(data, callback);
}

module.exports.taskDetails = (req, res, fields) => {
    const data = {
        task_id: req.params.task_id
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error taskDetails: ", error);
        } else
            res.status(200).json(
                results[0]
            );

    }
    model.getTaskDetails(data, callback)
}

///////////////////////////////////////////////////
////// Q9. DELETE /tasks/{task_id}
///////////////////////////////////////////////////

module.exports.deleteTaskById = (req, res, fields) => {
    const data = {
        task_id: req.params.task_id
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error deleteTaskById: ", error);
        } else {
            if (results.affectedRows == 0) {
                res.status(400).json({
                    message: "Task not found."
                })
            }else{
                res.status(204).send();
            }
        }
    }
    model.deleteById(data, callback);
}



