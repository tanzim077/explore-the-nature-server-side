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

const Payment = require("../payment/payment.model");
const Event = require("./event.model");
const CustomError = require("../../../utils/customError");
const mongoose = require("mongoose");
const SSLCommerzPayment = require("sslcommerz-lts");

const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false;
class PaymentService {
  static async createPayment(data, requestedUser) {
    const payment = new Event(data);
    payment.createdBy = requestedUser._id;
    await payment.save();
    return payment;
  }
}

module.exports = PaymentService;
