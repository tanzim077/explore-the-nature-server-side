/*
 * File           : user.route.js
 * Project        : explore-the-nature-server
 * Created Date   : Th 11 Jan 2024 06:53:29
 * Description    : <<description>>
 *
 *
 * Author         : Tanzim Ahmed
 * Email          : tanzim.ahmed1@g.bracu.ac.bd
 * ----------------------
 * Last Modified  : Thu Jan 11 2024
 * Modified By    : Tanzim Ahmed
 * ------------------------
 */

const express = require("express");
const router = express.Router();
const AuthController = require("./auth.controller");

router.post("/log-in/", AuthController.logIn);

module.exports = router;
