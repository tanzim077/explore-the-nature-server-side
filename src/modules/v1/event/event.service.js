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
const Event = require("./event.model");
const CustomError = require("../../../utils/customError");

class EventService {
  static async createEvent(data, requestedUser) {
    const event = new Event(data);
    event.createdBy = requestedUser._id;
    await event.save();
    return event;
  }

  static async getEvent(id) {
    return await Event.findById(id);
  }
  static async getAllEvents() {
    return await Event.find({});
  }
  static async updateEvent(id, data) {
    const allowedUpdates = ["title", "tourStartDate", "tourEndDate", "tourStartTime", "tourEndTime", "eventCost"];
    return this.basicUpdate(id, allowedUpdates, data);
  }
  static async deleteEvent(id) {
    const event = await Event.findById(id);
    await event.deleteOne();
    return event;
  }
  static async changeEventStatus(id, data) {
    const allowedUpdates = ["eventStatus"];
    return this.basicUpdate(id, allowedUpdates, data);
  }
  static async joinInEvent(id, requestedUser) {
    const allowedUpdates = ["joinedUser"];

    // return this.basicUpdate(id, allowedUpdates, data);
  }

  static async basicUpdate(id, allowedUpdates, data) {
    const updates = Object.keys(data);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
      throw new CustomError(400, "Invalid updates!");
    }
    const keys = Object.keys(data);
    const event = await Event.findById(id);
    if (!event) throw new CustomError(404, "Event not found!");
    keys.forEach((key) => {
      event[key] = data[key];
    });
    await event.save();
    return event;
  }
}

module.exports = EventService;
