/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const model = require('../models/userRewardRelModel.js');

///////////////////////////////////////////////////
////// Q6. POST /userRewardsRel
///////////////////////////////////////////////////

// CHECK USER_ID AND REWARD_ID
module.exports.checkUser_id = (req, res, next) => {
    if (req.body.user_id == undefined ||
        req.body.reward_id == undefined) {
        res.status(400).json({
            message: "Missing Description."
        })
    }
    const data = {
        userReward_id: req.params.userReward_id,
        user_id: req.body.user_id,
        reward_id: req.body.reward_id,
        date_claimed: req.body.date_claimed
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUser_id: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(400).json({
                    message: "User does not exist."
                })
            } else {
                next();
            }
        }
    }
    model.checkUser(data, callback);
}

module.exports.checkReward_id = (req, res, next) => {
    const data = {
        userReward_id: req.params.userReward_id,
        user_id: req.body.user_id,
        reward_id: req.body.reward_id,
        date_claimed: req.body.date_claimed
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkReward_id: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(400).json({
                    message: "Reward does not exist."
                })
            } else {
                next();
            }
        }
    }
    model.checkReward(data, callback);
}

module.exports.createNewRel = (req, res, next) => {
    const data = {
        userReward_id: req.params.userReward_id,
        user_id: req.body.user_id,
        reward_id: req.body.reward_id,
        date_claimed: req.body.date_claimed
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewRel: ", error);
            res.status(500).json(error);
        } else {
            res.locals.userReward_id = results.insertId;
            req.params.userReward_id = results.insertId;
            next();
        }
    }
    model.insertNew(data, callback);
}


module.exports.showRelDetails = (req, res, next) => {
    const data = {
        userReward_id: req.params.userReward_id,
        user_id: req.body.user_id,
        reward_id: req.body.reward_id,
        date_claimed: req.body.date_claimed
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error showRelDetails: ", error);
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
////// GET /userRewardsRel
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
////// GET /userRewardsRel/{:userReward_id}
///////////////////////////////////////////////////

module.exports.selectRelbyId = (req, res, next) => {
    const data = {
        userReward_id: req.params.userReward_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectRelbyId: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "userReward_id does not exist."
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }
    model.getRelById(data, callback);
}
///////////////////////////////////////////////////
////// PUT /userRewardsRel/{:userReward_id}
///////////////////////////////////////////////////
module.exports.updateRelbyId = (req, res, next) => {

    const data = {
        userReward_id: req.params.userReward_id,
        user_id: req.body.user_id,
        reward_id: req.body.reward_id,
        date_claimed: req.body.date_claimed
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateRelbyId:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Rel not found."
                });
                return;
            } else {
                next();
            }

        }
    }
    model.updateRel(data, callback);
}

module.exports.showRelDetailsForUpdate = (req, res, next) => {
    const data = {
        userReward_id: req.params.userReward_id,
        user_id: req.body.user_id,
        reward_id: req.body.reward_id,
        date_claimed: req.body.date_claimed
    };
    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error showRelDetailsForUpdate: ", error);
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
////// GET /userRewardsRel/{:user_id}
///////////////////////////////////////////////////
module.exports.getRelByUser_id = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getRelByUser_id: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "user_id does not exist."
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }
    model.getRel(data, callback);
}
///////////////////////////////////////////////////
////// DELETE /userRewardsRel/{:userReward_id}
///////////////////////////////////////////////////

module.exports.deleteRelById = (req, res, next) => {
    const data = {
        userReward_id: req.params.userReward_id
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
            else res.status(204).send();
        }
    }

    model.deleteRel(data, callback);
}

module.exports.getUserRewardDetailsByUser_id = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getUserRewardDetailsByUser_id: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Reward for the user does not exist."
                });
            } else {
                res.status(200).json(results);
            }
        }
    }
    model.selectUserRewardByUserId(data, callback);
}