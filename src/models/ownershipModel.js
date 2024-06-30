/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');

//////////////////////////////////////////////
//POST / OWNERSHIP
//////////////////////////////////////////////

//CHECK IF THE USER EXISTS
module.exports.checkUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE user_id = ?`

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

//CHECK IF THE PET EXISTS
module.exports.checkPet = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Pet
    WHERE pet_id = ?`

    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

module.exports.insertOwnership = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Ownership (user_id, pet_id, owned_on)
    VALUES (?, ?, NOW());
    `;
    const VALUES = [data.user_id, data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// TO SHOW THE DETAILS OF THE OWNERSHIP
module.exports.showDetails = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Ownership
    WHERE ownership_id = ?;
    `;
    const VALUES = [data.ownership_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////
//GET / OWNERSHIP
//////////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Ownership
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////
//GET / OWNERSHIP/{:ownership_id}
//////////////////////////////////////////////
module.exports.selectByOwnershipId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Ownership
    WHERE ownership_id = ?
    `;
    const VALUES = [data.ownership_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


//////////////////////////////////////////////
//PUT / OWNERSHIP/{:ownership_id}
//////////////////////////////////////////////

//UPDATE THE USER/PET
module.exports.updateOwnership = (data, callback) =>  {
    const SQLSTATEMENT = `
    UPDATE Ownership
    SET user_id = ?, pet_id = ?
    WHERE ownership_id = ?
    `;
    const VALUES = [data.user_id, data.pet_id, data.ownership_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}


//////////////////////////////////////////////
//DELETE / OWNERSHIP
//////////////////////////////////////////////
module.exports.deleteOwnership = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM Ownership
    WHERE ownership_id = ?;
    `;
    const VALUES = [data.ownership_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

////////////////////////////////////////////////////
// Section B
// NO. 9 
// To get the pet ownerships from the user_id
////////////////////////////////////////////////////
module.exports.getOwnership = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Ownership 
    WHERE user_id = ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

////////////////////////////////////////////////////
// Section B
// NO. 10 
// To get the user ownerships from the pet_id
////////////////////////////////////////////////////
module.exports.getUserOwner = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Ownership
    WHERE pet_id = ?
    `;
    const VALUES = [data.pet_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

////////////////////////////////////////////////////
// CA2 
// GET pet detail from user_id
////////////////////////////////////////////////////
module.exports.getPetDetailByUser_id = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT Pet.*, Ownership.* FROM Pet
    JOIN Ownership ON Pet.pet_id = Ownership.pet_id
    WHERE Ownership.user_id = ?
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}