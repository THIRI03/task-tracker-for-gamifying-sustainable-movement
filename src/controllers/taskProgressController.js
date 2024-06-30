/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const model = require('../models/taskProgressModel.js');

///////////////////////////////////////////////////
////// Q11. POST /task_progress
///////////////////////////////////////////////////

module.exports.checkUserIdExists = (req, res, next) => {
    if (req.body.user_id == undefined ||
        req.body.task_id == undefined ||
        req.body.completion_date == undefined ||
        req.body.notes == undefined) {
        res.status(400).json({
            message: "Missing Description."
        })
    }
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }
    const callback = (error, resutls, fields) => {
        if (error) {
            console.error("Error checkUserIdExists: ", error);
            res.status(500).json(error);
        } else {
            if (resutls.length == 0) {
                res.status(404).json({
                    message: "User_id does not exist."
                })
            } else {
                next();
            }
        }
    }
    model.checkUserId(data, callback)
}

module.exports.checkTaskIdExists = (req, res, next) => {
    const data = {
        task_id: req.body.task_id
    }
    const callback = (error, resutls, fields) => {
        if (error) {
            console.error("Error checkTaskIdExists: ", error);
            res.status(500).json(error);
        } else {
            if (resutls.length == 0) {
                res.status(404).json({
                    message: "Task_id does not exist."
                })
            } else {
                next();
            }
        }
    }
    model.checkTaskId(data, callback)
}

module.exports.insertTaskProgress = (req, res, next) => {
    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }
    const callback = (error, resutls, fields) => {
        if (error) {
            console.error("Error insertTaskProgress: ", error);
            res.status(500).json(error);
        } else {
            if (resutls.length == 0) {
                res.status(404).json({
                    message: "TaskProgress not created"
                });
            } else {
                res.locals.progress_id = resutls.insertId;
                req.params.progress_id = resutls.insertId;
                next();
            }
        }
    }
    model.insertTaskProgress(data, callback)
}

// TO GET THE TASK's DETAILS INCLUDING THE task_id
module.exports.showTaskProgressDetails = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id,
        task_id: res.body.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    };
    const callback = (error, results) => {
        if (error) {
            console.log("Error showTaskProgressDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(201).json(
                results[0]
            );
        }
    }
    model.showDetails(data, callback)
}

///////////////////////////////////////////////////
////// Q12. POST /task_progress/{progress_id}
///////////////////////////////////////////////////
module.exports.selectProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectProgressById: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "progress_id does not exist."
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }
    model.selectProgressById(data, callback);
}

///////////////////////////////////////////////////
////// Q13. PUT /task_progress/{progress_id}
///////////////////////////////////////////////////


module.exports.updateProgress = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id,
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateProgress: ", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "progress_id does not exist."
                })
            } else {
                next();
            }
        }
    }
    model.updateProgress(data, callback);
}

module.exports.showTaskProgressDetails = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error showTaskProgressDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(200).json(
                results[0]
            );
        }
    }
    model.showDetails(data, callback)
}

///////////////////////////////////////////////////
////// Q14. DELETE /task_progress/{progress_id}
///////////////////////////////////////////////////

module.exports.deleteTaskProgressById = (req, res, fields) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error deleteTaskProgressById: ", error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task_id does not exist."
                })
            } else {
                res.status(204).send();
            }
        }
    }
    model.deleteProgressById(data, callback);
}

///////////////////////////////////////////////////
////// No.3. Section B
///////////////////////////////////////////////////
module.exports.deleteTaskProgressByIdForB = (req, res, fields) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error deleteTaskProgressByIdForB: ", error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task_id does not exist."
                })
            } else {
                res.status(204).send();
            }
        }
    }
    model.deleteProgressByIdForRel(data, callback);
}

module.exports.getTaskProgressByUserId = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getTaskProgressByUserId: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task Progress does not exist."
                });
            } else {
                res.status(200).json(results);
            }
        }
    }
    model.selectTaskProgressByUser_id(data, callback);
}