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
const UserController = require("./user.controller");
const UserService = require("./user.service");

const userController = new UserController(UserService);

router.post("/create-user/", userController.createUser);
router.get("/get-all-users/", userController.getAllUsers);
router.get("/get-user/:id", userController.getUser);
router.patch("/update-user/:id", userController.updateUser);
router.patch("/change-user-role/:id", userController.changeUserRole);
router.patch("/deactivate-user/:id", userController.deactivateUser);
router.delete("/delete-user/:id", userController.deleteUser);
router.delete("/delete-user-by-email/:email", userController.deleteUserByEmail);

module.exports = router;
