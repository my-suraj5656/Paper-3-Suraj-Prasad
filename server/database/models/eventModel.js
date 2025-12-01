import mongoose from "mongoose";
const { Schema } = mongoose;

const location = new Schema({
  type: { type: String, enum: ["Point"], default: "Point" },
  coordinates: { type: [Number], default: [0, 0] },
});

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
    location: {
      name: { type: String },
      address: { type: String },
      location: location,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    price: { type: Number, default: 0 },
    capacity: { type: Number, required: true, min: 0 },
    seatsAvailable: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["open", "full", "closed", "cancelled"],
      default: "open",
    },
    organizer: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
