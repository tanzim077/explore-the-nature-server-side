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
    this.getUser = this.getUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.changeUserRole = this.changeUserRole.bind(this);
    this.deactivateUser = this.deactivateUser.bind(this);
    this.deleteUserByEmail = this.deleteUserByEmail.bind(this);
  }

  async getUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await this._userService.getUser(userId);
      return res.send(user);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await this._userService.getAllUsers();
      return res.send(users);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async updateUser(req, res) {
    try {
      const { body } = req;
      const { userId } = req.params;
      const updatedUser = await this._userService.updateUser(userId, body);
      return res.send(updatedUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const deletedUser = await this._userService.deleteUser(userId);
      return res.send(deletedUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  async deleteUserByEmail(req, res) {
    try {
      const { email } = req.params;
      const deletedUser = await this._userService.deleteUserByEmail(email);
      return res.status(200).send(deletedUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async createUser(req, res) {
    try {
      const { body } = req;
      const newUser = await this._userService.createUser(body);
      return res.send(newUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async changeUserRole(req, res) {
    try {
      const { body } = req;
      const { userId } = req.params;
      const updatedUser = await this._userService.changeUserRole(userId, body);
      return res.send(updatedUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async deactivateUser(req, res) {
    try {
      const { userId } = req.params;
      const updatedUser = await this._userService.deactivateUser(userId);
      return res.send(updatedUser);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

module.exports = UserController;
