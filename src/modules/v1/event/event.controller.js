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

    const newEvent = await this._eventService.createUser(body, user);
    return res.send(newEvent);
  }

  async getAllEvents(req, res) {
    const users = await this._eventService.getAllUsers();
    return res.send(users);
  }

  async getEvent(req, res) {
    const { id } = req.params;
    const user = await this._eventService.getUser(id);
    return res.send(user);
  }

  async updateEvent(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await this._eventService.updateUser(id, body);
    return res.send(updatedUser);
  }

  async changeEventStatus(req, res) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await this._eventService.changeUserRole(id, body);
    return res.send(updatedUser);
  }

  async deleteEvent(req, res) {
    const { id } = req.params;
    const deletedUser = await this._eventService.deleteUser(id);
    return res.send(deletedUser);
  }

  async joinInEvent(req, res) {
    const { id } = req.params;
    const { user } = req;
    const updatedUser = await this._eventService.joinInEvent(id, user);
    return res.send(updatedUser);
  }
}

module.exports = EventController;
