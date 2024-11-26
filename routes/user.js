const express = require("express");
const userController = require("../controllers/user");
const { verify } = require("../auth");

const router = express.Router();

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

// Get User's details
router.get('/details', verify, userController.getUserDetails);


module.exports = router;