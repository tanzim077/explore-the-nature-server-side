/*
 * File           : user.controller.js
 * Project        : explore-the-nature-server
 * Created Date   : Th 11 Jan 2024 06:53:07
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

const handleCatch = require("../../../utils/handleCatch");
const { storeNotification } = require("../notification/notification.service");
const Notification = require("../notification/notification.model");

class EventController {
  constructor(EventService) {
    this._eventService = EventService;
    this.createEvent = this._handleRequest(this.createEvent.bind(this));
    this.getEvent = this._handleRequest(this.getEvent.bind(this));
    this.getAllEvents = this._handleRequest(this.getAllEvents.bind(this));
    this.updateEvent = this._handleRequest(this.updateEvent.bind(this));
    this.deleteEvent = this._handleRequest(this.deleteEvent.bind(this));
    this.changeEventStatus = this._handleRequest(this.changeEventStatus.bind(this));
    this.joinInEvent = this._handleRequest(this.joinInEvent.bind(this));
  }

  _handleRequest(handler) {
    return async (req, res) => {
      try {
        await handler(req, res);
      } catch (err) {
        handleCatch(req, res, err);
      }
    };
  }

  async createEvent(req, res) {
    const { body } = req;
    const { user } = req;

    const newEvent = await this._eventService.createEvent(req, user);
    return res.send(newEvent);
  }

  async getAllEvents(req, res) {
    const users = await this._eventService.getAllEvents();
    return res.send(users);
  }

  async getEvent(req, res) {
    const { id } = req.params;
    const user = await this._eventService.getEvent(id);
    return res.send(user);
  }

  async updateEvent(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await this._eventService.updateEvent(id, body);
    return res.send(updatedUser);
  }

  async changeEventStatus(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await this._eventService.changeEventStatus(id, body);
    return res.send(updatedUser);
  }

  async deleteEvent(req, res) {
    const { id } = req.params;
    const deletedUser = await this._eventService.deleteEvent(id);
    return res.send(deletedUser);
  }

  async joinInEvent(req, res) {
    const { id } = req.params;
    const { user } = req;
    const updatedUser = await this._eventService.joinInEvent(id, user);
    return res.send(updatedUser);
  }
  async testEvent(req, res) {
    console.log("hit");
    await storeNotification({
      actionType: "test",
    });
    return res.send("event test route is working fine!");
  }
  async getAllNotifications(req, res) {
    const notifications = await Notification.find();
    return res.status(200).send(notifications);
  }
  }

module.exports = EventController;
