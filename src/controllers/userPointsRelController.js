/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { nextTick } = require('process');
const model = require('../models/userPointsRelModel.js');

///////////////////////////////////////////////////////
//POST /userPointsRel
///////////////////////////////////////////////////////
module.exports.checkUserExists = (req, res, next) => {
    if (req.body.user_id == undefined ||
        req.body.progress_id == undefined ||
        req.body.points == undefined) {
        res.status(400).send('Missing description in the request body.')
        return;
    }
    const data = {
        id: req.params.id,
        user_id: req.body.user_id,
        progress_id: req.body.progress_id,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserExists: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User does not exists."
                });
            } else {
                next();
            }
        }
    }
    model.checkUser(data, callback);
}


module.exports.checkTaskProgress = (req, res, next) => {
    const data = {
        id: req.params.id,
        user_id: req.body.user_id,
        progress_id: req.body.progress_id,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkTaskProgress: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task Progress does not exist in the taskProgress Table."
                })
            } else {
                next();
            }
        }
    }
    model.checkProgress(data, callback);
}

module.exports.checkProgressIdExists = (req, res, next) => {
    const data = {
        id: req.params.id,
        user_id: req.body.user_id,
        progress_id: req.body.progress_id,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkProgressIdExists: ", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "progress_id is associated."
                })
            } else {
                next();
            }
        }
    }
    model.checkProgress_idExists(data, callback)
}


module.exports.checkPoints = (req, res, next) => {
    const data = {
        id: req.params.id,
        user_id: req.body.user_id,
        progress_id: req.body.progress_id,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkPoints: ", error);
            res.status(500).json(error);
        } else {
            if (results[0].points != req.body.points) {
                res.status(404).json(
                    { message: "Points do not match." }
                )
            } else {
                next();
            }
        }
    }
    model.checkPoints(data, callback);
}
//to check the points  
module.exports.addNewPoints = (req, res, next) => {
    const data = {
        id: req.params.id,
        user_id: req.body.user_id,
        progress_id: req.body.progress_id,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addNewPoints: ", error);
            res.status(500).json(error);
        } else {
            res.locals.id = results.insertId;
            req.params.id = results.insertId;
            next();
        }
    }
    model.addPoints(data, callback);
}

module.exports.showPointsDetails = (req, res, next) => {
    const data = {
        id: res.locals.id
    };
    const callback = (error, results) => {
        if (error) {
            console.log("Error showPointsDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Rel not created"
                });
            } else {

            }
            res.status(201).json(
                results[0]
            );
        }
    }
    model.showDetails(data, callback)
}
//error: do not accept when there is no record in the taskprogress

///////////////////////////////////////////////////////
//GET /userPointsRel
///////////////////////////////////////////////////////
module.exports.readAllRel = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllRel: ", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}
///////////////////////////////////////////////////////
//GET /userPointsRel/id
///////////////////////////////////////////////////////
module.exports.readRelById = (req, res, next) => {
    const data = {
        id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readRelById: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "id not found."
                })
            } else {
                res.status(200).json(results);
            }
        }
    }
    model.selectById(data, callback);
}
///////////////////////////////////////////////////////
//GET /userPointsRel/user_id/totalPoints
///////////////////////////////////////////////////////
module.exports.showTotalPoints = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error showTotalPoints:", error);
            res.status(500).json(error);
        } else {
            if (!results[0].user_id) {
                res.status(404).json({
                    message: "user_id not found."
                })
            } else {
                res.status(200).json(results);
            }
        }
    }
    model.getTotalPoints(data, callback);
}

///////////////////////////////////////////////////////
//PUT /userPointsRel
//TO UPDATE THE USER_ID
///////////////////////////////////////////////////////

module.exports.checkUserExistsForUpdate = (req, res, next) => {
    if (req.body.user_id == undefined) {
        res.status(400).send('Missing description in the request body.')
        return;
    }
    const data = {
        id: req.params.id,
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserExistsForUpdate: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User_id does not exists."
                });
            } else {
                next();
            }
        }
    }
    model.checkUser(data, callback);
}

module.exports.updateUser_IdById = (req, res, next) => {

    const data = {
        id: req.params.id,
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUser_IdById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Rel_id not found."
                });
                return;
            } else {
                next()
            }

        }
    }
    model.updateUserById(data, callback);
}


//CHECK USER_ID >> PROGRESS_ID >> POINTS THEN PUT

///////////////////////////////////////////////////////
//PUT /userPointsRel
//TO UPDATE THE progress_id
///////////////////////////////////////////////////////
module.exports.checkTaskProgressForUpdate = (req, res, next) => {
    if (req.body.progress_id == undefined ||
        req.body.points == undefined) {
        res.status(400).send('Missing description in the request body.')
        return;
    }
    const data = {
        id: req.params.id,
        progress_id: req.body.progress_id,
        points: req.body.points
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkTaskProgressForUpdate: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task Progress does not exist."
                })
            } else {
                next();
            }
        }
    }
    model.checkProgress(data, callback);
}
module.exports.updateProgressIdById = (req, res, next) => {

    const data = {
        id: req.params.id,
        progress_id: req.body.progress_id,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateProgressIdById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Rel_id not found."
                });
                return;
            } else {
                next();
            }

        }
    }
    model.updateProgressId(data, callback);
}

module.exports.showPointsDetailForUpdate = (req, res, next) => {
    const data = {
        id: req.params.id,
        progress_id: req.body.progress_id,
        points: req.body.points
    };
    const callback = (error, results) => {
        if (error) {
            console.log("Error showPointsDetailForUpdate: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(200).json(
                results[0]
            );
        }
    }
    model.showDetails(data, callback)
}

///////////////////////////////////////////////////////
//DELETE /userPointsRel/id
///////////////////////////////////////////////////////
module.exports.deleteRelById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteRelById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Rel not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteRelById(data, callback);
}


