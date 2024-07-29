const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminMiddleware = require("./middleware/adminMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);

// Admin routes protection
app.use("/api/trains/create", adminMiddleware);

module.exports = app;
