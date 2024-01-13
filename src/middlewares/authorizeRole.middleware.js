/*
 * File           : authorizeRole.middleware.js
 * Project        : explore-the-nature-server
 * Created Date   : Su 14 Jan 2024 01:58:17
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

const approvedUser = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(401).json({
        status: "failed",
        message: "Your role is not authorized to perform this action.",
      });
    }
    next();
  };
};

module.exports = approvedUser;
