/*
 * File           : user.service.js
 * Project        : explore-the-nature-server
 * Created Date   : Th 11 Jan 2024 06:53:14
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

const Notification = require(process.cwd() + "/src/modules/v1/notification/notification.model");
const { sendNotification } = require("../socket/socketConnection");

module.exports.storeNotification = async ({ actionType, targetUser }) => {
  let data;
  switch (actionType) {
    case "test":
      data = {
        title: `This is a test notification`,
        message: `This is a test notification at ${new Date().toLocaleString()}`,
        type: "test",
      };
      break;

    default:
      data = {
        title: "Test notification",
        message: "",
        type: "",
        notificationFor: [],
      };
      break;
  }

  const notification = new Notification(data);

  switch (actionType) {
    case "test":
      sendNotification(notification, actionType, targetUser);
      break;

    default:
      break;
  }
  if (actionType !== "takeJobAnnotator") {
    await notification.save();
  }
  return notification;
};
