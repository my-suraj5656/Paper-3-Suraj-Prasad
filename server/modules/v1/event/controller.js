import Event from "../../../database/models/eventModel.js";
import Registration from "../../../database/models/registrationModel.js";
import User from "../../../database/models/userModel.js";
import validatorRules from "../../validatorRule.js";
import crypto from "crypto";

const eventController = {
  // Create event
  async createEvent(req, res) {
    try {
      // console.log(true);

      const id = req.user.id;
      //   console.log(id);

      const data = req.body;
      if (!data.capacity)
        return res.status(400).json({ message: "capacity is required" });
      if (data.seatsAvailable == null) data.seatsAvailable = data.capacity;

      const updateddata = {
        ...data,
        organizer: id,
      };
      const event = new Event(updateddata);
      await event.save();
      return res.status(201).json({ message: "Event created", data: event });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ message: error.message || "Error creating event" });
    }
  },

  // getallevent
  async getAllEvent(req, res) {
    try {
      // console.log(true);

      const event = await Event.find();
      return res.status(200).json({ data: event });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // editevent
  async updateEvent(req, res) {
    try {
      const { id } = req.params;
      const updatesdata = req.body;
      //   console.log(id);

      const event = await Event.findByIdAndUpdate(id, updatesdata, {
        new: true,
      });
      if (!event) return res.status(404).json({ message: "event not found" });
      return res.status(200).json({ message: "event is updated", data: event });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // getsingleevent
  async getEventById(req, res) {
    try {
      const { id } = req.params;
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: "Event not found" });
      return res.status(200).json({ data: event });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // deletebyid
  async deleteEvent(req, res) {
    try {
      const { id } = req.params;
      const event = await Event.findByIdAndDelete(id);
      if (!event) return res.status(404).json({ message: "Event not found" });
      return res.status(200).json({ message: "Event deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Register for an event
  async register(req, res) {
    try {
      const userId = req.user.id;
      const { event, tickets = 1 } = req.body;
      const myUniqueId = crypto.randomUUID();
      if (!event || !userId)
        return res
          .status(400)
          .json({ message: "eventId and userId are required" });
      const reg = await Registration.create({
        user: userId,
        event: event,
        tickets: Number(tickets),
        uniqueCode: myUniqueId,
      });
      return res
        .status(201)
        .json({ message: "Registration created", data: reg });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  //cancel
  async cancelRegistration(req, res) {
    try {
      const { id } = req.params;
      const registration = await Registration.findByIdAndUpdate(
        id,
        {
          $set: { status: "cancelled" },
        },
        { new: true }
      );

      const event = await Event.findByIdAndUpdate(
        { id: registration.event },
        {
          $set: { status: "cancelled" },
        },
        { new: true }
      );
      if (!registration)
        return res.status(404).json({ message: "Registration not found" });
      return res
        .status(200)
        .json({ message: "Registration cancelled", data: registration, event });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error.message || "Error cancelling registration" });
    }
  },
};

export default eventController;
