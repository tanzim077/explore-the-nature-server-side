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
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startDateAndTime: {
      type: String,
    },
    endDateAndTime: {
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
    coverImages: [
      {
        type: String,
      },
    ],
    photos: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Event", EventSchema);
