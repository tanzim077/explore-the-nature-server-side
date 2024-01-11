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

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    contact: {
      type: String,
    },
    registeredEvents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    archivedEvents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    pendingPayment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    archivedPayment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    authInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", UserSchema);

