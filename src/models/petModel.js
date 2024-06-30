/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const { callbackify } = require('util');
const pool = require('../services/db');

//////////////////////////////////////////////
//POST / PET
//////////////////////////////////////////////
module.exports.insertPet = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Pet (pet_name, type, pet_breed, hunger_level, activity, grooming)
    VALUES ( ?, ?, ?, ?, ?, ?);
    `;
    const VALUES = [data.pet_name, data.type, data.pet_breed, data.hunger_level, data.activity, data.grooming];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// TO SHOW THE DETAILS OF THE PET
module.exports.showDetails = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Pet
    WHERE pet_id = ?;
    `;
    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////
//GET / PET
//////////////////////////////////////////////

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Pet
    `;

    pool.query(SQLSTATEMENT, callback);
}

//////////////////////////////////////////////
//GET / PET/{:pet_id}
//////////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Pet
    WHERE pet_id = ?
    `;
    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////
//PUT / PET/{:pet_id}
//////////////////////////////////////////////
module.exports.updatePet = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Pet
    SET pet_name = ?, pet_breed = ?, hunger_level = ?, activity = ?, grooming = ?
    WHERE pet_id = ?`

    const VALUES = [data.pet_name, data.pet_breed, data.hunger_level, data.activity, data.grooming, data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);

}

//check if the pet name is already associated with another pet

module.exports.checkPetName = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Pet 
    WHERE pet_name = ?
    `;

    const VALUES = [data.pet_name];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

//////////////////////////////////////////////
//DELETE / PET
//////////////////////////////////////////////


module.exports.deletePetByid = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE Pet, Ownership
    FROM Pet
    LEFT JOIN Ownership ON Pet.pet_id = Ownership.pet_id
    WHERE Pet.pet_id = ?

    `;
    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

