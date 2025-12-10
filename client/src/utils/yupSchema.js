import * as yup from "yup";

export const eventValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),

  category: yup.string().required("Category is required"),

  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  image: yup
    .string()
    .url("Invalid image URL")
    .required("Image URL is required"),

  locationName: yup.string().required("Location name is required"),

  address: yup.string().required("Address is required"),

  latitude: yup
    .number()
    .typeError("Latitude must be a number")
    .required("Latitude is required"),

  longitude: yup
    .number()
    .typeError("Longitude must be a number")
    .required("Longitude is required"),

  startDate: yup
    .date()
    .required("start date is required")
    .typeError("Invalid startdate"),

  endDate: yup
    .date()
    .required("end date is required")
    .typeError("Invalid enddate")
    .min(yup.ref("startDate"), "End date cannot be earlier than start date"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),

  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .min(0, "Capacity cannot be negative")
    .required("Capacity is required"),

  seatsAvailable: yup
    .number()
    .typeError("Seats available must be a number")
    .min(0, "Seats available cannot be negative")
    .required("Seats available is required"),

  status: yup
    .string()
    .oneOf(["open", "full", "closed", "cancelled"], "Invalid status value")
    .required("Status is required"),
});

export const eventRegisterSchema = yup.object().shape({
  tickets: yup
    .number()
    .typeError("Tickets must be a number")
    .required("Tickets are required")
    .min(1, "At least 1 ticket is required"),

  Paid: yup
    .number()
    .typeError("Paid amount must be a number")
    .min(0, "Amount cannot be negative")
    .required("Paid amount is required"),

  status: yup
    .string()
    .oneOf(
      ["confirmed", "waitlisted", "cancelled", "checked-in", "checked-out"],
      "Invalid status"
    )
    .required("Status is required"),

  paymentStatus: yup
    .string()
    .oneOf(["pending", "paid", "failed"], "Invalid payment status")
    .required("Payment status is required"),

  seatNumbers: yup
    .string()
    .transform((val) => val.trim())
    .matches(
      /^([A-Za-z0-9]+)(,\s*[A-Za-z0-9]+)*$/,
      "Seat numbers must be comma separated (Ex: A1, B2, C5)"
    )
    .required("Seat numbers are required"),
});
