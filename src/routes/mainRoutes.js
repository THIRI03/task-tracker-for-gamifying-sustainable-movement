/*
NAME: THIRI LAE WIN
CLASS: DIT/FT/1B/10
ADM NO: p2340739
*/
const express = require('express');
const router = express.Router();

const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController');


///////////////////////////////////////////////////////////////////////
//CA2
///////////////////////////////////////////////////////////////////////
router.post("/login", userController.login, bcryptMiddleware.hashPassword, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

const taskRoute = require("./taskRoute");
const petRoute = require("./petRoute");
const rewardRoute = require("./rewardRoute");
const userRoute = require("./userRoute");
const messagesRoute = require("./messagesRoute");
const ownershipRoute = require("./ownershipRoute");
const taskProgressRoute = require("./taskProgressRoute");
const userRewardRelRoute = require("./userRewardRelRoute");
const userPointsRelRoute = require("./userPointsRelRoute");

router.use("/user", userRoute);
router.use("/task", taskRoute);
router.use("/pet", petRoute)
router.use("/reward", rewardRoute);
router.use("/message", messagesRoute);
router.use("/ownership", ownershipRoute);
router.use("/taskProgress", taskProgressRoute);
router.use("/userRewardRel", userRewardRelRoute);
router.use("/userPointsRel", userPointsRelRoute);

module.exports = router;