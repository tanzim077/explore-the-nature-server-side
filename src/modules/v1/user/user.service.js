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
const CustomError = require("../../../utils/customError");
const axios = require("axios");

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
    const allowedUpdates = ["name", "address", "contact"];
    return this.basicUpdate(id, allowedUpdates, data);
  }
  static async changeUserRole(id, data) {
    const allowedUpdates = ["role"];
    return this.basicUpdate(id, allowedUpdates, data);
  }
  static async deactivateUser(id, data) {
    const user = await User.findById(id);
    await user.updateOne(data);
    return user;
  }
  static async getUserByToken(id, token) {
    const user = await User.findOne({
      _id: id,
      "tokens.token": token,
    });
    return user;
  }
  static async logIn(email, password) {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    return { user, token };
  }

  static async logOut(user, token) {
    user.tokens = user.tokens.filter((tok) => {
      return tok.token !== token;
    });
    await user.save();
  }

  static async basicUpdate(id, allowedUpdates, data) {
    const updates = Object.keys(data);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      throw new CustomError(400, "Invalid updates!");
    }
    const keys = Object.keys(data);
    const user = await User.findById(id);
    if (!user) throw new CustomError(404, "User not found!");
    keys.forEach((key) => {
      user[key] = data[key];
    });
    await user.save();
    return user;
  }
  static async checkSPVUser(req, res) {
    try {
      const data = {
        qai_id: req.body.qai_id,
      };

      const result = await axios.post(`${process.env.SPV_FETCH_URL}/check-username`, data);
      if (result.data) {
        return res.status(200).send({
          status: "success",
          user: result.data,
          message: "User is already exists in SPV",
        });
      } else {
        return res.status(404).send({ status: "failed", message: "User is not found SPV" });
      }
    } catch (error) {
      return "internal server error";
    }
  }
}

module.exports = UserService;
