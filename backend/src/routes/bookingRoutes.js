const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/:booking_id", authMiddleware, bookingController.getBookingDetails);

module.exports = router;
