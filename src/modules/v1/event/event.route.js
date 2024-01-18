/*
 * File           : user.route.js
 * Project        : explore-the-nature-server
 * Created Date   : Th 11 Jan 2024 06:53:29
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

const express = require("express");
const router = express.Router();
const EventController = require("./event.controller");
const EventService = require("./event.service");

const eventController = new EventController(EventService);

const authMiddleware = require("../../../middlewares/auth.middleware");

const approvedFor = require("../../../middlewares/authorizeRole.middleware");
const { uploadEventCoverImage, uploadEventCoverFiles } = require("../../../utils/multer/multerUpload");

const { authenticate } = authMiddleware;
const possibleFields = [{ name: "coverImages", maxCount: 1 }];
const filesUpload = uploadEventCoverFiles.fields(possibleFields);

router.post("/create-event/", authenticate, approvedFor("admin"), (req, res, next) => {
  filesUpload(req, res, (err) => {
    if (err) {
      handleMulterErrors(err, req, res, next);
    } else {
      eventController.createEvent(req, res);
    }
  });
});

router.get("/get-event/:id", eventController.getEvent);

router.get("/get-all-events/", eventController.getAllEvents);

router.patch("/update-event/:id", authenticate, approvedFor("admin"), eventController.updateEvent);

router.delete("/delete-event/:id", authenticate, approvedFor("admin"), eventController.deleteEvent);

router.patch("/change-event-status/:id", authenticate, approvedFor("admin"), eventController.changeEventStatus);

router.patch("/join-in-event/:id", authenticate, approvedFor("admin", "manager", "user"), eventController.joinInEvent);

module.exports = router;
