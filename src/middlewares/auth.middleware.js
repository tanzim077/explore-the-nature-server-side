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

class AuthMiddleware {
  constructor(UserService) {
    this._userService = UserService;
    this.authenticate = this.authenticate.bind(this);
  }

  static async authenticate(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).send("Unauthorized");
      }
      const [bearer, token] = authorization.split(" ");
      if (bearer !== "Bearer") {
        return res.status(401).send("Unauthorized");
      }
      const user = await this._userService.getUserByToken(token);
      if (!user) {
        return res.status(401).send("Unauthorized");
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

module.exports = AuthMiddleware;
