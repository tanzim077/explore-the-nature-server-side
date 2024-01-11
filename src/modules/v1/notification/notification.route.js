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

router.post("/create-notification/", "createUser");
router.get("/get-all-notifications/", "createUser");
router.get("/get-notification/:id", "createUser");
router.patch("/update-notification/:id", "createUser");
router.patch("/change-notification-status/:id", "createUser");
router.delete("/delete-notification/:id", "createUser");

module.exports = router;