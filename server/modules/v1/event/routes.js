import express from "express";
import eventController from "./controller.js";
import { headersValidation } from "../../../middleware/allValidator.js";

const router = express();

// createvent
router.post("/createevent", headersValidation, eventController.createEvent);

// getallevent
router.get("/getallevent", eventController.getAllEvent);

// update event
router.put("/update/:id", headersValidation, eventController.updateEvent);

// getoneevent
router.get("/getbyid/:id", headersValidation, eventController.getEventById);

// delete
router.delete(
  "/deletebyid/:id",
  headersValidation,
  eventController.deleteEvent
);

// registerevent
router.post("/registerevent", headersValidation, eventController.register);

// registerevent
router.put(
  "/cancelledevent/:id",
  headersValidation,
  eventController.cancelRegistration
);

export default router;
