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

const handleCatch = require("../../../utils/handleCatch");

class UserController {
  constructor(UserService) {
    this._userService = UserService;
    this.getUser = this.getUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.changeUserRole = this.changeUserRole.bind(this);
    this.deactivateUser = this.deactivateUser.bind(this);
    this.deleteUserByEmail = this.deleteUserByEmail.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this._userService.getUser(id);
      return res.send(user);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this._userService.getAllUsers();
      return res.send(users);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }

  async updateUser(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedUser = await this._userService.updateUser(id, body);
      return res.send(updatedUser);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await this._userService.deleteUser(id);
      return res.send(deletedUser);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }
  async deleteUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const deletedUser = await this._userService.deleteUserByEmail(email);
      return res.status(200).send(deletedUser);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }

  async createUser(req, res) {
    try {
      const { body } = req;
      const newUser = await this._userService.createUser(body);
      return res.send(newUser);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }

  async changeUserRole(req, res) {
    try {
      const { body } = req;
      const { id } = req.params;
      const updatedUser = await this._userService.changeUserRole(id, body);
      return res.send(updatedUser);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }

  async deactivateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = await this._userService.deactivateUser(id);
      return res.send(updatedUser);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }

  async logIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this._userService.logIn(email, password);
      return res.send(user);
    } catch (err) {
      handleCatch(req, res, err);
    }
  }

  async logOut(req, res) {
    try {
      const { user, token } = req;
      await this._userService.logOut(user, token);
      return res.send("Logged out");
    } catch (err) {
      handleCatch(req, res, err);
    }
  }
}

module.exports = UserController;
