const express = require("express");
const { registerUser, loginUser } = require("../userControllers/controller");
const { userRegisterValidation, userLoginValidation } = require("../utils/userValidation");
const routes = express.Router();

routes.post('/register',userRegisterValidation, registerUser);

routes.post("/login", userLoginValidation ,loginUser);

module.exports = routes;