/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const model = require('../models/rewardModel.js');

///////////////////////////////////////////////////
//POST /reward
///////////////////////////////////////////////////
module.exports.insertNew = (req, res, next) => {
    if (req.body.minimum_points == undefined ||
        req.body.reward == undefined) {
        res.status(400).json({
            message: "Missing Description"
        })
    }
    const data = {
        minimum_points: req.body.minimum_points,
        reward: req.body.reward
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error insertNew: ", error);
            res.status(500).json(error);
        }
        else {
            res.locals.reward_id = results.insertId;
            req.params.reward_id = results.insertId;
            next();
        };
    };
    model.createNewReward(data, callback);
}

module.exports.showDetails = (req, res, next) => {
    if (req.body.minimum_points == undefined ||
        req.body.reward == undefined) {
        res.status(400).send('minimum_points or reward is undefined.')
        return;
    }
    const data = {
        reward_id: res.locals.reward_id,
        minimum_points: req.body.minimum_points,
        reward: req.body.reward
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error showDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Reward not created"
                });
            } else
                res.status(201).json(
                    results[0]
                );
        }
    }
    model.showDetails(data, callback)
}

//////////////////////////////////////////////
// Get /Reward
///////////////////////////////////////////////
module.exports.readAll = (req, res, next) => {
    const data = {
        id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAll: ", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results)
        }
    }
    model.selectAll(callback);
}

//////////////////////////////////////////////
// Get /Reward/{:id}
///////////////////////////////////////////////
module.exports.readRewardById = (req, res, next) => {
    const data = {
        reward_id: req.params.reward_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readRewardById: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Reward_Id not found."
                })
            } else {
                res.status(200).json(results);
            }
        }
    }
    model.selectById(data, callback);
}

//////////////////////////////////////////////
// PUT /Reward/{:id}
///////////////////////////////////////////////
//Check if the reward is the same as from the database

module.exports.checkRewardExists = (req, res, next) => {
    if (req.body.minimum_points == undefined ||
        req.body.reward == undefined) {
        res.status(400).send('minimum_points or reward is undefined.')
        return;
    }
    const data = {
        reward_id: req.params.reward_id,
        minimum_points: req.body.minimum_points,
        reward: req.body.reward
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error checkRewardExists: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        }else{
            if ( results.length > 0 ) {
                res.status(409).json({
                    message: "Reward already exists"
                })
            }else{
                next();
            }
        }
    }
    model.checkReward (data, callback);
}

module.exports.updateRewardById = (req, res, next) => {
    
    const data = {
        reward_id: req.params.reward_id,
        minimum_points: req.body.minimum_points,
        reward: req.body.reward
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error updateRewardById: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Reward_id not found."
                })
            } else {
                next();
            }
        }
    }
    model.updateReward(data, callback);
}

module.exports.showUpdatedDetails = (req, res, next) => {

    const data = {
        reward_id: req.params.reward_id,
        minimum_points: req.body.minimum_points,
        reward: req.body.reward
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error showUpdatedDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Reward not updated"
                });
            } else
                res.status(201).json(
                    results[0]
                );
        }
    }
    model.showDetails(data, callback)
}
//////////////////////////////////////////////
// DELETE /Reward/{:id}
///////////////////////////////////////////////

module.exports.deleteRewardById = (req, res, next) => {
    const data = {
        reward_id: req.params.reward_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.log("Error deleteRewardById: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.affectedRows == 0) {
                res.status(400).json({
                    message: "Reward not found."
                })
            } else {
                res.status(204).send();
            }
        }
    }
    model.deleteReward(data, callback);
}





