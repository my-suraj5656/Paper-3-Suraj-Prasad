import eventModule from "./module.js";

const eventController = {
  // Create Event
  async createEvent(req, res) {
    const data = req.body;
    const userId = req.user.id;

    if (!data.capacity)
      return res.status(400).json({ message: "capacity is required" });

    if (data.seatsAvailable == null) data.seatsAvailable = data.capacity;

    const finalData = {
      ...data,
      organizer: userId,
    };

    return eventModule.createEvent(finalData, res);
  },

  // Get all events
  async getAllEvent(req, res) {
    return eventModule.getAllEvent(res);
  },

  // geteventbyid
  async getEventById(req, res) {
    const { id } = req.params;
    return eventModule.getEventById(id, res);
  },

  // updatebyid
  async updateEvent(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    return eventModule.updateEvent(id, updateData, res);
  },

  // deletebyid
  async deleteEvent(req, res) {
    const { id } = req.params;
    return eventModule.deleteEvent(id, res);
  },

  // Register user for event
  async register(req, res) {
    const userId = req.user.id;
    const { event, tickets = 1 } = req.body;

    return eventModule.register(userId, event, tickets, res);
  },

  // Cancel registration
  async cancelRegistration(req, res) {
    const { id } = req.params;
    return eventModule.cancelRegistration(id, res);
  },
};

export default eventController;
