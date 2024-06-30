/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const model = require('../models/ownershipModel.js');

//////////////////////////////////////////////
//POST / OWNERSHIP
//////////////////////////////////////////////

//CHECK IF THE USER EXISTS
module.exports.checkUserExists = (req, res, next) => {
    if (req.body.user_id == undefined ||
        req.body.pet_id == undefined
    ) {
        res.status(400).send('Missing Descriptions.')
        return;
    }

    const data = {
        user_id: req.body.user_id
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

//CHECK IF THE PET EXISTS
module.exports.checkPetExists = (req, res, next) => {

    const data = {
        pet_id: req.body.pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkPetExists: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet does not exists."
                });
            } else {
                next();
            }
        }
    }
    model.checkPet(data, callback);
}
module.exports.createNewOwnership = (req, res, next) => {
    const data = {
        ownership_id: res.locals.ownership_id,
        user_id: req.body.user_id,
        pet_id: req.body.pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewOwnership: ", error);
            res.status(500).json(error);
        }
        else {
            res.locals.ownership_id = results.insertId;
            req.params.ownership_id = results.insertId;
            next();
        };
    };
    model.insertOwnership(data, callback);
}

module.exports.showOwnershipDetails = (req, res, next) => {
    const data = {
        ownership_id: res.locals.ownership_id
    };
    const callback = (error, results) => {
        if (error) {
            console.log("Error showOwnershipDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Ownership was not created"
                });
            } else {

            }
            res.status(201).json(
                ownership = results[0]
            );
        }
    }
    model.showDetails(data, callback)
}

//////////////////////////////////////////////
//GET / OWNERSHIP
//////////////////////////////////////////////
module.exports.readAllOwnership = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllOwnership: ", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

//////////////////////////////////////////////
//GET / OWNERSHIP/{:ownership_id}
//////////////////////////////////////////////
module.exports.readOwnershipById = (req, res, next) => {
    const data = {
        ownership_id: req.params.ownership_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readOwnershipById: ", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Ownership not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }
    model.selectByOwnershipId(data, callback);
}

//////////////////////////////////////////////
//PUT / OWNERSHIP/{:ownership_id}
//////////////////////////////////////////////
module.exports.checkUserExistsForUpdate = (req, res, next) => {
    if (req.body.user_id == undefined ||
        req.body.pet_id == undefined
    ) {
        res.status(400).send('Missing Descriptions.')
        return;
    }

    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserExistsForUpdate: ", error);
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

module.exports.updateOwnership = (req, res, next) => {
    const data = {
        ownership_id: req.params.ownership_id,
        user_id: req.body.user_id,
        pet_id: req.body.pet_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateOwnership:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Ownership not found."
                })
            } else {
                next();
            }
        }
    }
    model.updateOwnership(data, callback);
}

module.exports.showUpdatedOwnershipDetails = (req, res, next) => {
    const data = {
        ownership_id: req.params.ownership_id,
        user_id: req.body.user_id,
        pet_id: req.body.pet_id
    };
    const callback = (error, results) => {
        if (error) {
            console.log("Error showOwnershipDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Ownership not updated."
                });
            } else {

            }
            res.status(200).json(
                ownership = results[0]
            );
        }
    }
    model.showDetails(data, callback)
}
//////////////////////////////////////////////
//DELETE / OWNERSHIP
//////////////////////////////////////////////

module.exports.deleteOwnershipById = (req, res, next) => {
    const data = {
        ownership_id: req.params.ownership_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteOwnershipById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Ownership not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }
    model.deleteOwnership(data, callback);
}

////////////////////////////////////////////////////
// Section B
// NO. 9 
// To get the pet ownerships from the user_id
////////////////////////////////////////////////////
module.exports.getOwnershipsByUser_id = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getOwnershipsByUser_id:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User_id not found."
                })
            } else {
                res.status(200).send(results)
            }
        }
    }
    model.getOwnership(data, callback);
}

////////////////////////////////////////////////////
// Section B
// NO. 10 
// To get the user ownerships from the pet_id
////////////////////////////////////////////////////
module.exports.getOwnershipsByPet_id = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getOwnershipsByPet_id:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet_id not found."
                })
            } else {
                res.status(200).send(results)
            }
        }
    }
    model.getUserOwner(data, callback);
}

//USED IN CA2
module.exports.getPetByUser_id = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getPetByUser_id:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet not found."
                })
            } else {
                res.status(200).send(results)
            }
        }
    }
    model.getPetDetailByUser_id(data, callback);
}

