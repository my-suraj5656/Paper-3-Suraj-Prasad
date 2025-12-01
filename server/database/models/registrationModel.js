import mongoose from "mongoose";
const { Schema } = mongoose;

const registrationSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tickets: { type: Number, default: 1, min: 1 },
    status: {
      type: String,
      enum: [
        "confirmed",
        "waitlisted",
        "cancelled",
        "checked-in",
        "checked-out",
      ],
      default: "confirmed",
    },
    Paid: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    uniqueCode: { type: String, index: true, unique: true },
    seatNumbers: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
