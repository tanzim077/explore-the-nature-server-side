/*
 * File           : cloudinary.js
 * Project        : explore-the-nature-server
 * Created Date   : Fr 19 Jan 2024 02:43:59
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
const cloudinary = require("cloudinary").v2;
const util = require("util");
const fs = require("fs");
const unlinkFile = util.promisify(fs.unlink);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: false,
});

class Cloudinary {
  static async uploadImage(imagePath) {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      const result = await cloudinary.uploader.upload(imagePath, options);
      await unlinkFile(imagePath);
      return result.url;
    } catch (error) {
      await unlinkFile(imagePath);
      console.error(error);
    }
  }
}

module.exports = Cloudinary;
