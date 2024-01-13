/*
 * File           : auth.middleware.js
 * Project        : explore-the-nature-server
 * Created Date   : Sa 13 Jan 2024 11:44:07
 * Description    : <<description>>
 *
 *
 * Author         : Tanzim Ahmed
 * Email          : tanzim.ahmed1@g.bracu.ac.bd
 * ----------------------
 * Last Modified  : Sat Jan 13 2024
 * Modified By    : Tanzim Ahmed
 * ------------------------
 */
const jwt = require("jsonwebtoken");
const UserService = require("../modules/v1/user/user.service");

class AuthMiddleware {
  constructor() {
    this.authenticate = this.authenticate.bind(this);
  }
  static async authenticate(req, res, next) {
    try {
      const { authorization } = req.headers;
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      if (!authorization) {
        return res.status(401).send({ message: "Token not valid." });
      }
      const user = await UserService.getUserByToken(decoded._id, token);

      if (!user) {
        return res.status(401).send({ message: "Requested User not found." });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

module.exports = AuthMiddleware;
