const pool = require("../config/database");

class Train {
  static async create(
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination
  ) {
    const result = await pool.query(
      "INSERT INTO trains (train_name, source, destination, seat_capacity, available_seats, arrival_time_at_source, arrival_time_at_destination) VALUES ($1, $2, $3, $4, $4, $5, $6) RETURNING id",
      [
        train_name,
        source,
        destination,
        seat_capacity,
        arrival_time_at_source,
        arrival_time_at_destination,
      ]
    );
    return result.rows[0];
  }

  static async findByRoute(source, destination) {
    const result = await pool.query(
      "SELECT id, train_name, available_seats FROM trains WHERE source = $1 AND destination = $2",
      [source, destination]
    );
    return result.rows;
  }

  static async bookSeats(trainId, userId, noOfSeats) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const trainResult = await client.query(
        "SELECT available_seats FROM trains WHERE id = $1 FOR UPDATE",
        [trainId]
      );
      if (trainResult.rows[0].available_seats >= noOfSeats) {
        await client.query(
          "UPDATE trains SET available_seats = available_seats - $1 WHERE id = $2",
          [noOfSeats, trainId]
        );
        const bookingResult = await client.query(
          "INSERT INTO bookings (user_id, train_id, no_of_seats) VALUES ($1, $2, $3) RETURNING id",
          [userId, trainId, noOfSeats]
        );
        const seatNumbers = Array.from({ length: noOfSeats }, (_, i) => i + 1); // Simplified seat number generation
        await client.query("COMMIT");
        return { id: bookingResult.rows[0].id, seat_numbers: seatNumbers };
      } else {
        throw new Error("Not enough seats available");
      }
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = Train;
