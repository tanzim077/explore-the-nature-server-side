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
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new CustomError(400, "Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
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

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.emailToken;

  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      name: user.name,
    },
    process.env.JWT_SECRET
  );
  if (user.tokens.length === 5) {
    user.tokens.pop();
  }
  user.tokens.unshift({ token });
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    throw new Error("The email you entered is not registered in our application.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Wrong password");
  }
  return user;
};

UserSchema.statics.findByEmail = async (email) => {
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
// Hash the plain text password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
