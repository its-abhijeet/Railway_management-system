const pool = require("../config/database");

class Booking {
  static async create(userId, trainId, noOfSeats, seatNumbers) {
    const result = await pool.query(
      "INSERT INTO bookings (user_id, train_id, no_of_seats, seat_numbers) VALUES ($1, $2, $3, $4) RETURNING id",
      [userId, trainId, noOfSeats, seatNumbers]
    );
    return result.rows[0];
  }

  static async findById(bookingId) {
    const result = await pool.query(
      `SELECT b.id as booking_id, b.train_id, t.train_name, b.user_id, b.no_of_seats, b.seat_numbers,
      t.arrival_time_at_source, t.arrival_time_at_destination
      FROM bookings b
      JOIN trains t ON b.train_id = t.id
      WHERE b.id = $1`,
      [bookingId]
    );
    return result.rows[0];
  }
}

module.exports = Booking;
