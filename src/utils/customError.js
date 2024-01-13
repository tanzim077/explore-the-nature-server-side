/*
 * File           : customError.js
 * Project        : explore-the-nature-server
 * Created Date   : Su 14 Jan 2024 01:51:54
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

class CustomError extends Error {
  /**
   * @param {number} statusCode - status code of the error
   * @param {string} message - message of the error
   * @returns {object} - returns an object with statusCode and message
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
