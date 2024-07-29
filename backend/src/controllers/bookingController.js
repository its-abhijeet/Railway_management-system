const Booking = require("../models/Booking");

exports.getBookingDetails = async (req, res) => {
  const { booking_id } = req.params;
  try {
    const booking = await Booking.findById(booking_id);
    if (booking) {
      res.json(booking);
    } else {
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching booking details" });
  }
};
