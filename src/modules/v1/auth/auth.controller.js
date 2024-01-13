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

class AuthController {
  constructor(AuthService) {
    this._authService = AuthService;
    this.logIn = this.logIn.bind(this);
  }

  static async logIn(req, res) {
    try {
      const { body } = req;
      const user = await this._authService.logIn(body);
      return res.send(user);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

module.exports = AuthController;