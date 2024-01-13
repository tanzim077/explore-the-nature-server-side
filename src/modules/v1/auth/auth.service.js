/*
 * File           : user.service.js
 * Project        : explore-the-nature-server
 * Created Date   : Th 11 Jan 2024 06:53:14
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

class AuthService {
  constructor(UserService, bcrypt, jwt) {
    this._userService = UserService;
    this._bcrypt = bcrypt;
    this._jwt = jwt;
    this.logIn = this.logIn.bind(this);
  }

  async logIn(data) {
    const { email, password } = data;
    const user = await this._userService.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await this._bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password is not valid");
    }
    const token = this._jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return { user, token };
  }
}
