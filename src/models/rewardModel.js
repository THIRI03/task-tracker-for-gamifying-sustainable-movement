/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');

//////////////////////////////////////////////
// POST /Reward
///////////////////////////////////////////////
module.exports.createNewReward = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Rewards (minimum_points, reward)
    VALUES (?, ?);
    `;

    const VALUES = [data.minimum_points, data.reward];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.showDetails = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Rewards
    WHERE reward_id = ?
    `;
    const VALUES = [data.reward_id, data.minimum_points, data.reward];
    pool.query(SQLSTATEMENT, VALUES, callback);

}

//////////////////////////////////////////////
// Get /Reward
///////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Rewards
    `;
    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////
// Get /Reward/{:id}
///////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Rewards
    WHERE reward_id = ?
    `;
    const VALUES = [data.reward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////
// PUT /Reward/{:id}
///////////////////////////////////////////////
module.exports.updateReward = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Rewards
    SET minimum_points = ?, reward = ?
    WHERE reward_id = ?
    `;
    const VALUES = [data.minimum_points, data.reward, data.reward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkReward = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Rewards
    WHERE reward = ?
    `;
    const VALUES = [data.reward];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////
// Delete /Reward/{:id}
///////////////////////////////////////////////
module.exports.deleteReward = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE Rewards, userRewardsRel
    FROM Rewards
    LEFT JOIN userRewardsRel ON Rewards.reward_id = userRewardsRel.reward_id
    WHERE Rewards.reward_id = ?
    `;
    const VALUES = [data.reward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);

}