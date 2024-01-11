/*
 * File           : user.model.js
 * Project        : explore-the-nature-server
 * Created Date   : Th 11 Jan 2024 06:53:00
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

const mongoose = require("mongoose");

const { Schema } = mongoose;

const PaymentSchema = new Schema(
  {
    paymentType: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
    totalDue: {
      type: String,
    },
    totalPaid: {
      type: String,
    },
    vat: {
      type: String,
    },
    paymentReduce: {
      type: String,
    },
    paymentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Payment", PaymentSchema);
