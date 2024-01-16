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
    registeredEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
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
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
      validator(value) {
        if (!validator.isIn(value, ["admin", "manager", "user"])) {
          throw new CustomError(400, "Invalid role");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    emailToken: [
      {
        token: {
          type: String,
        },
      },
    ],
    forgetPasswordToken: [
      {
        token: {
          type: String,
        },
      },
    ],
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
  delete userObject.forgetPasswordToken;

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
  const user = await User.findOne({
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

const User = mongoose.model("User", UserSchema);
module.exports = User;
