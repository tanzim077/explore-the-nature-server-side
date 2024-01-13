/*
 * File           : handleCatch.js
 * Project        : explore-the-nature-server
 * Created Date   : Su 14 Jan 2024 01:52:42
 * Description    : <<description>>
 *
 *
 * Author         : Tanzim Ahmed
 * Email          : tanzim.ahmed1@g.bracu.ac.bd
 * ----------------------
 * Last Modified  : Sun Jan 14 2024
 * Modified By    : Tanzim Ahmed
 * ------------------------
 */
const multer = require("multer");
const fs = require("fs");

const formateErrorKeys = (keys) => {
  switch (keys) {
    case "email":
      return "Email";
    case "password":
      return "Password";
    case "name":
      return "Name";
    case "phone":
      return "Phone";
    case "address":
      return "Address";
    case "role":
      return "Role";
    case "status":
      return "Status";
    case "id":
      return "Id";
    case "title":
      return "Title";
    case "description":
      return "Description";
    case "dob":
      return "Date of Birth";
    case "lastName":
      return "Last Name";
    case "firstName":
      return "First Name";
    case "image":
      return "Image";
    case "contactNo":
      return "Contact No";
    case "billingAccountNo":
      return "Nagad Account No";
    default:
      return keys;
  }
};

const handleCatch = (req, res, error) => {
  if (req) {
    if (req.files) {
      const images = Object.keys(req.files);
      for (const image of images) {
        const img = req.files[image][0];
        const filePath = img.path;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("File deleted!");
          }
        });
      }
    }
  }
  if (error.errors) {
    const keys = Object.keys(error?.errors);
    const errorFieldKeys = keys.map((key) => formateErrorKeys(key));
    const errorField = errorFieldKeys.toString(); //TODO: change this to a better error message by formatting the keys
    const message = `Error in ${errorField}. Please follow the correct format.`;
    return res.status(error.statusCode || 500).send({ message: message || "Internal Server Error" });
  }
  return res.status(error.statusCode || 500).send({ message: error.message || "Internal Server Error" });
};

module.exports = handleCatch;
