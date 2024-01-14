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

const authMiddleware = require("../../../middlewares/auth.middleware");

const approvedFor = require("../../../middlewares/authorizeRole.middleware");

const { authenticate } = authMiddleware;

router.post("/create-user/", userController.createUser);

router.post("/log-in/", userController.logIn);

router.post("/log-out/", authenticate, userController.logOut);

router.get("/get-all-users/", authenticate, userController.getAllUsers);

router.get("/get-user/:id", userController.getUser);

router.patch("/update-user/:id", authenticate, approvedFor("admin"), userController.updateUser);

router.patch("/change-user-role/:id", authenticate, approvedFor("admin"), userController.changeUserRole);

router.delete("/delete-user/:id", authenticate, approvedFor("admin"), userController.deleteUser);

router.delete("/delete-user-by-email/:email", authenticate, approvedFor("admin"), userController.deleteUserByEmail);

router.patch("/deactivate-user/:id", authenticate, approvedFor("admin"), userController.deactivateUser);

module.exports = router;
