const Train = require("../models/Train");

exports.getAvailability = async (req, res) => {
  const { source, destination } = req.query;
  try {
    const trains = await Train.findByRoute(source, destination);
    res.json(
      trains.map((train) => ({
        Train_id: train.id,
        train_name: train.train_name,
        available_seats: train.available_seats,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Error fetching availability" });
  }
};

exports.createTrain = async (req, res) => {
  const {
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
  } = req.body;
  try {
    const train = await Train.create(
      train_name,
      source,
      destination,
      seat_capacity,
      arrival_time_at_source,
      arrival_time_at_destination
    );
    res.status(200).json({
      message: "Train added Successfully",
      train_id: train.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating train" });
  }
};

exports.bookSeat = async (req, res) => {
  const { train_id } = req.params;
  const { user_id, no_of_seats } = req.body;
  try {
    const booking = await Train.bookSeats(train_id, user_id, no_of_seats);
    res.status(200).json({
      message: "Seat booked successfully",
      booking_id: booking.id,
      seat_numbers: booking.seat_numbers,
    });
  } catch (error) {
    res.status(500).json({ error: "Error booking seat" });
  }
};
