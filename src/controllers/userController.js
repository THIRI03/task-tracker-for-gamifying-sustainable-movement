/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/

const model = require('../models/userModel.js');

//////////////////////////////////////////////
// POST /users
///////////////////////////////////////////////


//////////////////////////////////////////////
// check if the user exists
///////////////////////////////////////////////

module.exports.checkEmailById = (req, res, next) => {
    if (req.body.username == undefined ||
        req.body.email == undefined) {
        res.status(400).send('User Name or Email is undefined.')
        return;
    }
    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkEmailById: ", error);
            res.status(500).json(error);
        } else if (results.length > 0) {
            res.status(409).json({
                error: 'Email is already associated with another user'
            });
            return;

        } else {
            next();
        }
    }; model.checkEmail(data, callback)
}


///////////////////////////////////////////////////
//Q1. POST /users
///////////////////////////////////////////////////
module.exports.createNewUser = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewUser: ", error);
            res.status(500).json(error);
        }
        else {
            res.locals.user_id = results.insertId;
            req.params.user_id = results.insertId;
            next();
        };
    };
    model.insertUser(data, callback);
}

module.exports.showUserDetails = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    };
    const callback = (error, results) => {
        if (error) {
            console.log("Error showUserDetails: ", error);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not created"
                });
            } else {

            }
            res.status(201).json(
                user = results[0]
            );
        }
    }
    model.showDetails(data, callback)
}



///////////////////////////////////////////////////
//Q2. GET /users
///////////////////////////////////////////////////
module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser: ", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    model.selectAll(callback);
}

///////////////////////////////////////////////////
//Q3. GET /users/user_id
///////////////////////////////////////////////////
//get user by id including the points earned by user
module.exports.readUserByUserId = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByUserId: ", error);
            res.status(500).json(error);
        } else {
            if (!results[0].user_id) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                res.status(200).json(results[0]);
            }
        }
    }
    model.selectByUserId(data, callback);
}



///////////////////////////////////////////////////
//Q4. PUT /users/user_id
///////////////////////////////////////////////////
module.exports.checkUserNameAndEmail = (req, res, next) => {
    if (req.body.username == undefined ||
        req.body.email == undefined) {
        res.status(400).send('User Name or Email is undefined.')
        return;
    }
    const data = {
        user_id: req.params.user_id,
        username: req.body.username,
        email: req.body.email
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUserNameAndEmail:", error);
            res.status(500).json(error);
        } else if (results.length > 0) {
            res.status(409).json({
                message: "Username or email is already associated with another user."
            })

        } else {
            next();
        }
    }
    model.checkUserAndEmail(data, callback);
}

module.exports.updateUserById = (req, res, next) => {

    const data = {
        user_id: req.params.user_id,
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
                return;
            } else {
                next();
            }

        }
    }

    model.updateUserByid(data, callback);
}

////////////////////////////////////////////////////////
///////////////////////////////////////////////////////

module.exports.updatedUserDetails = (req, res, next) => {
    const data = {
        user_id: req.params.user_id,
        username: req.body.username
    }
    const callback = (error, results) => {
        if (error) {
            console.log("Error updatedUserDetails: ", error);
        } else {
            res.status(200).json(
                results[0]
            )
        }
    }
    model.updatedUserDetailsbyId(data, callback);
}


//delete

module.exports.deleteUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserByid:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteUserByid(data, callback);
}

/////////////////////////////////////////
//SECTION B
///////////////////////////////////////
module.exports.deleteUserRelated = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserRelated:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteUserRelatedById(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error registerNewUser:", error);
            res.status(500).json(error);
        } else if (results.affectedRows > 0) {
            res.locals.user_id = results.insertId;
            res.locals.message = "User " + req.body.username + " created successfully."
            next();
        }
    }
    model.createNewUser(data, callback);
}

module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    if (req.body.username == undefined ||
        req.body.email == undefined ||
        req.body.password == undefined) {
        res.status(400).json({
            message: "Missing required body."
        })
    }
    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.password
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkUsernameOrEmailExist:", error);
            res.status(500).json(error);
        } else if (results.length > 0) {
            res.status(409).json({
                message: "Username or email already exists"
            })
        } else {
            next();
        }
    }
    model.selectUserByUserNameOrEmail(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
    if (req.body.email == undefined ||
        req.body.password == undefined) {
        res.status(400).json({
            message: "Missing required body."
        })
    }
    const data = {
        email: req.body.email,
        password: res.locals.hash
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                })
            } else {
                res.locals.user_id = results[0].user_id
                next();
            }
        }
    }
    model.checkEmailAndPassword(data, callback);
}


//////////////////////////////////////////////////////
// SAMPLE
//////////////////////////////////////////////////////
module.exports.readUserById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    model.selectById(data, callback);
}

//////////////////////////////////////////////////////
// GET MESSAGES BY USER_ID
//////////////////////////////////////////////////////
module.exports.readMessagesById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Messages not found"
                });
            }
            else res.status(200).json(results);
        }
    }
    model.selectMessagesById(data, callback);
}