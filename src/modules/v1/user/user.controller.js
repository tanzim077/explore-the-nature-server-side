/*
 * File           : user.controller.js
 * Project        : explore-the-nature-server
 * Created Date   : Th 11 Jan 2024 06:53:07
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

class UserController {
  constructor(UserService) {
    this._userService = UserService;
  }

  getUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await this._userService.getUser(userId);
      return res.send(user);
    } catch (err) {
      handleCatch(err);
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await this._userService.getUsers();
      return res.send(users);
    } catch (err) {
      handleCatch(err);
    }
  };

  updateUser = async (req, res) => {
    try {
      const { body } = req;
      const { userId } = req.params;
      const updatedUser = await this._userService.updateUser(userId, body);
      return res.send(updatedUser);
    } catch (err) {
      handleCatch(err);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await this._userService.deleteUser(userId);
      return res.send(deletedUser);
    } catch (err) {
      handleCatch(err);
    }
  };
  deleteUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const deletedUser = await this._userService.deleteUserByEmail(email);
      return res.status(200).send(deletedUser);
    } catch (err) {
      console.log("🚀 ~ UserController ~ deleteUserByEmail ~ err:", err)
      return res.status(500).send(err);
    }
  };

  createUser = async (req, res) => {
    try {
      const { body } = req;
      const newUser = await this._userService.createUser(body);
      return res.send(newUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  changeUserRole = async (req, res) => {
    try {
      const { body } = req;
      const { userId } = req.params;
      const updatedUser = await this._userService.changeUserRole(userId, body);
      return res.send(updatedUser);
    } catch (err) {
      handleCatch(err);
    }
  };

  deactivateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const updatedUser = await this._userService.deactivateUser(userId);
      return res.send(updatedUser);
    } catch (err) {
      handleCatch(err);
    }
  };
}

module.exports = UserController;
