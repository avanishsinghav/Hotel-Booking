import express from "express";
import {
  createBookings,
  createPaymentIntent,
  updatePatmentAvailability,
} from "../controller/Booking.js";

const app = express.Router();

app.post("/create-payment-intent", createPaymentIntent);
app.patch("/update-availability", updatePatmentAvailability);
app.post("/create-booking", createBookings);
export default app;
