/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');

///////////////////////////////////////////////////
////// POST /userRewardsRel
///////////////////////////////////////////////////

// CHECK USER_ID AND REWARD_ID

module.exports.checkUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT user_id FROM User
    WHERE user_id = ?
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.checkReward = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT reward_id FROM Rewards
    WHERE reward_id = ?
    `;
    const VALUES = [data.reward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.insertNew = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO userRewardsRel
    SET user_id = ?, reward_id = ?, date_claimed = NOW();
    `
    const VALUES = [data.user_id, data.reward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.showDetails = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM userRewardsRel
    WHERE userReward_id = ?
    `;
    const VALUES = [data.userReward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}


///////////////////////////////////////////////////
////// GET /userRewardsRel
///////////////////////////////////////////////////
module.exports.getAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM userRewardsRel
    `;
    pool.query(SQLSTATEMENT, callback);
}

///////////////////////////////////////////////////
////// GET /userRewardsRel/{:userReward_id}
///////////////////////////////////////////////////
module.exports.getRelById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM userRewardsRel
    WHERE userReward_id = ?
    `;
    const VALUES = [data.userReward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

///////////////////////////////////////////////////
////// GET /userRewardsRel/{:user_id}
///////////////////////////////////////////////////
module.exports.getRel = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM userRewardsRel
    WHERE user_id = ?
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);}
///////////////////////////////////////////////////
////// PUT /userRewardsRel/{:userReward_id}
///////////////////////////////////////////////////

module.exports.updateRel =(data, callback) => {
    const SQLSTATEMENT = `
    UPDATE userRewardsRel
    SET user_id = ?, reward_id = ?
    WHERE userReward_id = ?
    `;
    const VALUES = [data.user_id, data.reward_id, data.userReward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

///////////////////////////////////////////////////
////// DELETE /userRewardsRel/{:userReward_id}
///////////////////////////////////////////////////
module.exports.deleteRel = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM userRewardsRel
    WHERE userReward_id = ?
    `;
    const VALUES = [data.userReward_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}


module.exports.selectUserRewardByUserId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT userRewardsRel.*, rewards.*
    FROM userRewardsRel
    JOIN rewards ON rewards.reward_id = userRewardsRel.reward_id
    WHERE userRewardsRel.user_id = ?
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}
