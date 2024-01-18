/*
 * File           : multer.js
 * Project        : explore-the-nature-server
 * Created Date   : Fr 19 Jan 2024 01:48:31
 * Description    : <<description>>
 *
 *
 * Author         : Tanzim Ahmed
 * Email          : tanzim.ahmed1@g.bracu.ac.bd
 * ----------------------
 * Last Modified  : Fri Jan 19 2024
 * Modified By    : Tanzim Ahmed
 * ------------------------
 */
const multer = require("multer");
const fs = require("fs");
const User = require("../../modules/v1/user/user.model");
const Event = require("../../modules/v1/event/event.model");

const path = require("path");
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

function handleMulterErrors(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send({ message: "File size too large" });
    }
  } else if (err) {
    return res.status(500).send({ message: "An error occurred during file upload" });
  }
  next();
}


const eventCoverImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directoryPath = "tmp/uploads/event/cover/";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    cb(null, directoryPath);
  },
  filename: async function (req, file, cb) {
    cb(null, new Date().getTime() + file.originalname);
  },
});

const uploadEventCoverFiles = multer({
  storage: eventCoverImageStorage,
  limits: { fileSize: 1024 * 1024 * 1 },
  fileFilter: fileFilter,
});

const uploadEventCoverImage = multer({
  storage: eventCoverImageStorage,
  limits: { fileSize: 1024 * 1024 * 1 },
  fileFilter: fileFilter,
});

module.exports = {
  uploadEventCoverImage,
  handleMulterErrors,
  uploadEventCoverFiles,
};
