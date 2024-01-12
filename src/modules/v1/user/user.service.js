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

const User = require("./user.model");
class UserService {
  static async createUser(data) {
    const user = new User(data);
    await user.save();
    return user;
  }
  static async deleteUserByEmail(email) {
    const user = await User.findOne({ email });
    await user.deleteOne();
    return user;
  }
  static async deleteUser(id) {
    const user = await User.findById(id);
    await user.deleteOne();
    return user;
  }
  static async getAllUsers() {
    return await User.find({});
  }
  static async getUser(id) {
    return await User.findById(id);
  }
  static async updateUser(id, data) {
    const user = await User.findById(id);
    await user.updateOne(data);
    return user;
  }
  static async changeUserRole(id, data) {
    const user = await User.findById(id);
    await user.updateOne(data);
    return user;
  }
  static async deactivateUser(id, data) {
    const user = await User.findById(id);
    await user.updateOne(data);
    return user;
  }
}

module.exports = UserService;
