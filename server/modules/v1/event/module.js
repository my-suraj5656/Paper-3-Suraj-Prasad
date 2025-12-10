import Event from "../../../database/models/eventModel.js";
import Registration from "../../../database/models/registrationModel.js";
import crypto from "crypto";

const eventModule = {
  // Create Event
  createEvent: async (data, res) => {
    try {
      const event = new Event(data);
      await event.save();
      return res.status(201).json({ message: "Event created", data: event });
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Error creating event",
      });
    }
  },

  // Get all events
  getAllEvent: async (res) => {
    try {
      const events = await Event.find();
      return res.status(200).json({ data: events });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  },

  // Get event by ID
  getEventById: async (id, res) => {
    try {
      const event = await Event.findById(id);
      if (!event) return res.status(404).json({ message: "Event not found" });

      return res.status(200).json({ data: event });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Update event
  updateEvent: async (id, updateData, res) => {
    try {
      const event = await Event.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!event) return res.status(404).json({ message: "Event not found" });

      return res.status(200).json({ message: "Event updated", data: event });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Delete event
  deleteEvent: async (id, res) => {
    try {
      const event = await Event.findByIdAndDelete(id);
      if (!event) return res.status(404).json({ message: "Event not found" });

      return res.status(200).json({ message: "Event deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Register for event
  register: async (userId, eventId, tickets, res) => {
    try {
      if (!eventId)
        return res.status(400).json({ message: "eventId is required" });

      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });

      if (event.seatsAvailable < tickets)
        return res.status(400).json({ message: "Not enough seats available" });

      // Generate unique registration code
      const uniqueCode = crypto.randomUUID();

      // Create registration
      const reg = await Registration.create({
        user: userId,
        event: eventId,
        tickets: Number(tickets),
        uniqueCode,
      });

      // Reduce available seats
      event.seatsAvailable -= tickets;
      await event.save();

      return res
        .status(201)
        .json({ message: "Registration successful", data: reg });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Cancel registration
  cancelRegistration: async (id, res) => {
    try {
      const registration = await Registration.findById(id);
      if (!registration)
        return res.status(404).json({ message: "Registration not found" });

      // Mark registration as cancelled
      registration.status = "cancelled";
      await registration.save();

      // Return seats to event
      const event = await Event.findById(registration.event);
      if (event) {
        event.seatsAvailable += registration.tickets;
        await event.save();
      }

      return res.status(200).json({
        message: "Registration cancelled",
        data: registration,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

export default eventModule;
