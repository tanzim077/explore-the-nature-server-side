/*
 * File           : socketConnecrtion.js
 * Project        : explore-the-nature-server
 * Created Date   : Mo 12 Feb 2024 12:26:15
 * Description    : <<description>>
 *
 *
 * Author         : Tanzim Ahmed
 * Email          : tanzim.ahmed1@g.bracu.ac.bd
 * ----------------------
 * Last Modified  : Mon Feb 12 2024
 * Modified By    : Tanzim Ahmed
 * ------------------------
 */
const ActiveUser = require(process.cwd() + "/src/modules/v1/activeUser/activeUser.model");

let io;
module.exports.connectSocket = (server) => {
  io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });
  return io;
};

module.exports.sendNotification = (notification, type, data) => {
  switch (type) {
    case "approvedUser":
      io.emit("approvedUser", notification, data);
      break;
    default:
      io.emit("notification", notification);
      break;
  }
};

module.exports.registerServer = async (io) => {
  io.on("connection", async (socket) => {
    console.log("🔥🔥🔥🔥  New user connected 🔥🔥🔥🔥 ");
    // Listening for the customUser event from the client
    socket.on("customUserData", async (customUserData) => {
      const existingUser = await ActiveUser.findOne({
        dbId: customUserData._id,
      });
      if (Object.keys(customUserData).length > 0) {
        if (existingUser) {
          existingUser.id = socket.id;
          existingUser.connectedAt = new Date();
          await existingUser.save();
        } else {
          const activeUser = new ActiveUser({
            id: socket.id,
            connectedAt: new Date(),
            dbId: customUserData._id,
            role: customUserData.role,
          });
          await activeUser.save();
        }
      }
    });
    // when a user sign up to the system
    socket.on("joinNewUser", ({ role }) => {
      if (antRole.includes(role)) {
        const message = {
          message: "A user just joined the application",
        };
        io.emit("joinNewUser", message);
      }
    });

    socket.on("test", () => {
      console.log("test");
      io.emit("test", "nothing here just for testing");
    });
    socket.on("disconnect", async () => {
      const currentSocketActiveUser = await ActiveUser.findOne({
        id: socket.id,
      });

      if (currentSocketActiveUser) {
        currentSocketActiveUser.disconnectedAt = new Date();
        currentSocketActiveUser.remove((err, user) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(`User ${user.id} removed from database`);
        });
      }
      console.log("🚫🚫🚫🚫 Client disconnected 🚫🚫🚫🚫");
    });
  });
};

// module.exports = { registerServer, io, sendNotification };
