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
    this.getUser = this.handleRequest(this.getUser.bind(this));
    this.deleteUser = this.handleRequest(this.deleteUser.bind(this));
    this.getAllUsers = this.handleRequest(this.getAllUsers.bind(this));
    this.updateUser = this.handleRequest(this.updateUser.bind(this));
    this.createUser = this.handleRequest(this.createUser.bind(this));
    this.changeUserRole = this.handleRequest(this.changeUserRole.bind(this));
    this.deactivateUser = this.handleRequest(this.deactivateUser.bind(this));
    this.deleteUserByEmail = this.handleRequest(this.deleteUserByEmail.bind(this));
    this.logIn = this.handleRequest(this.logIn.bind(this));
    this.logOut = this.handleRequest(this.logOut.bind(this));
  }

  handleRequest(handler) {
    return async (req, res) => {
      try {
        await handler(req, res);
      } catch (err) {
        handleCatch(req, res, err);
      }
    };
  }

  async getUser(req, res) {
    const { id } = req.params;
    const user = await this._userService.getUser(id);
    return res.send(user);
  }

  async getAllUsers(req, res) {
    const users = await this._userService.getAllUsers();
    return res.send(users);
  }

  async updateUser(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await this._userService.updateUser(id, body);
    return res.send(updatedUser);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = await this._userService.deleteUser(id);
    return res.send(deletedUser);
  }

  async deleteUserByEmail(req, res) {
    const { email } = req.params;
    const deletedUser = await this._userService.deleteUserByEmail(email);
    return res.status(200).send(deletedUser);
  }

  async createUser(req, res) {
    const { body } = req;
    const newUser = await this._userService.createUser(body);
    return res.send(newUser);
  }

  async changeUserRole(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await this._userService.changeUserRole(id, body);
    return res.send(updatedUser);
  }

  async deactivateUser(req, res) {
    const { id } = req.params;
    const updatedUser = await this._userService.deactivateUser(id);
    return res.send(updatedUser);
  }

  async logIn(req, res) {
    const { email, password } = req.body;
    const user = await this._userService.logIn(email, password);
    return res.send(user);
  }

  async logOut(req, res) {
    const { user, token } = req;
    await this._userService.logOut(user, token);
    return res.send("Logged out");
  }
}

module.exports = UserController;
