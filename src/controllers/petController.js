/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const model = require('../models/petModel.js');

//////////////////////////////////////////////
//POST / PET
//////////////////////////////////////////////

module.exports.createNewPet = (req, res, next) => {
    if (req.body.pet_name == undefined ||
        req.body.pet_breed == undefined ||
        req.body.type == undefined ||
        req.body.activity == undefined ||
        req.body.hunger_level == undefined ||
        req.body.grooming == undefined) {
        res.status(400).send('Missing Descriptions.')
        // return;
    }


    const data = {
        pet_id: req.body.pet_id,
        pet_name: req.body.pet_name,
        pet_breed: req.body.pet_breed,
        type: req.body.type,
        activity: req.body.activity,
        hunger_level: req.body.hunger_level,
        grooming: req.body.grooming
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPet: ", error);
            res.status(500).json(error);
        }
        else {
            res.locals.pet_id = results.insertId;
            req.params.pet_id = results.insertId;
            next();
        };
    };
    model.insertPet(data, callback);
}
module.exports.showPetDetails = (req, res, next) => {
    const data = {
        pet_id: res.locals.pet_id
    };
    const callback = (error, results) => {
        if (error) {
            console.log("Error showPetDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet was not created"
                });
            } else {

            }
            res.status(201).json(
                pet = results[0]
            );
        }
    }
    model.showDetails(data, callback)
}

//////////////////////////////////////////////
//GET / PET
//////////////////////////////////////////////
module.exports.readAllPets = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPets: ", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

//////////////////////////////////////////////
//GET / PET/{:pet_id}
//////////////////////////////////////////////

module.exports.readPetById = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPetById: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }
    model.selectById(data, callback);
}

//////////////////////////////////////////////
//PUT / PET/{:pet_id}
//////////////////////////////////////////////

module.exports.updatePetById = (req, res, next) => {

    const data = {
        pet_id: req.params.pet_id,
        pet_name: req.body.pet_name,
        pet_breed: req.body.pet_breed,
        type: req.body.type,
        activity: req.body.activity,
        hunger_level: req.body.hunger_level,
        grooming: req.body.grooming
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePetById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Pet not found"
                });
                return;
            } else {
                next(); 
            }

        }
    }

    model.updatePet(data, callback);
}

module.exports.showUpdatedPetDetails = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id,
        pet_name: req.body.pet_name,
        pet_breed: req.body.pet_breed,
        type: req.body.type,
        activity: req.body.activity,
        hunger_level: req.body.hunger_level,
        grooming: req.body.grooming    };
    const callback = (error, results) => {
        if (error) {
            console.log("Error showUpdatedPetDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.status(200).json(
                results
            );
        }
    }
    model.showDetails(data, callback)
}

//check if the pet name is already associated with another pet
module.exports.checkPetName = (req, res, next) => {
    if (req.body.pet_name == undefined ||
        req.body.pet_breed == undefined ||
        req.body.type == undefined ||
        req.body.activity == undefined ||
        req.body.hunger_level == undefined ||
        req.body.grooming == undefined) {
        res.status(400).send('Missing Descriptions.')
        return;
    }
    
    const data = {
        pet_id: req.params.pet_id,
        pet_name: req.body.pet_name,
        type: req.body.type,
        pet_breed: req.body.pet_breed,
        activity: req.body.activity,
        hunger_level: req.body.hunger_level,
        grooming: req.body.grooming
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkPetName:", error);
            res.status(500).json(error);
        } else if (results.length > 0) {
            const existingUser = results[0];
            if (existingUser.username === data.username || existingUser.email === data.email) {
                res.status(409).json({
                    message: "Pet name is already associated with another pet."
                })
            }
        } else {
            next();
        }
    }
    model.checkPetName(data, callback);
}


//////////////////////////////////////////////
//DELETE / PET
//////////////////////////////////////////////

module.exports.deletePetByid = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePetByid:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Pet not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deletePetByid(data, callback);
}

