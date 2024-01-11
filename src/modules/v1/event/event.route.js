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

router.post("/create-event/", "createUser");
router.get("/get-all-events/", "createUser");
router.get("/get-event/:id", "createUser");
router.patch("/update-event/:id", "createUser");
router.patch("/change-event-status/:id", "createUser");
router.delete("/delete-event/:id", "createUser");

module.exports = router;