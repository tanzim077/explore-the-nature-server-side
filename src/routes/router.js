/*
 * File           : router.js
 * Project        : explore-the-nature-server
 * Created Date   : Fr 12 Jan 2024 08:44:03
 * Description    : <<description>>
 *
 *
 * Author         : Tanzim Ahmed
 * Email          : tanzim.ahmed1@g.bracu.ac.bd
 * ----------------------
 * Last Modified  : Fri Jan 12 2024
 * Modified By    : Tanzim Ahmed
 * ------------------------
 */
const express = require("express");
const router = express.Router();
const UserRouter = require("../modules/v1/user/user.route");

router.use("/users", UserRouter);

module.exports = router;
