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

const EventSchema = new Schema(
  {
    title: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tourStartDate: {
      type: String,
    },
    tourEndDate: {
      type: String,
    },
    tourStartTime: {
      type: String,
    },
    tourEndTime: {
      type: String,
    },
    eventStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    joinedUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eventCost: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Event", EventSchema);
