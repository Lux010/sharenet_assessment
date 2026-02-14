import express from "express";
import { pool } from "../db.js";

const router = express.Router();

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

router.post("/", async (req, res) => {
  const conn = await pool.getConnection();

  try {
    const {
      venueId,
      venueName,
      dateId,
      date,
      time,
      firstName,
      lastName,
      email,
      phone,
    } = req.body || {};

    // Basic validation
    if (!venueId || !venueName || !dateId || !date || !time) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing booking details." });
    }
    if (!firstName || !lastName || !email || !phone) {
      return res
        .status(400)
        .json({ ok: false, error: "Missing user details." });
    }
    if (!isEmail(email)) {
      return res
        .status(400)
        .json({ ok: false, error: "Invalid email address." });
    }

    await conn.beginTransaction();

    // Lock the workshop row so concurrent bookings queue up safely
    const [rows] = await conn.execute(
      `SELECT date_id, seats_available
       FROM workshop_dates
       WHERE date_id = ?
       FOR UPDATE`,
      [dateId]
    );

    if (rows.length === 0) {
      await conn.rollback();
      return res
        .status(404)
        .json({ ok: false, error: "Workshop date not found." });
    }

    const seatsAvailable = Number(rows[0].seats_available || 0);

    if (seatsAvailable <= 0) {
      await conn.rollback();
      return res
        .status(400)
        .json({ ok: false, error: "Sorry, this workshop is sold out." });
    }

    // Decrement seats
    await conn.execute(
      `UPDATE workshop_dates
       SET seats_available = seats_available - 1
       WHERE date_id = ?`,
      [dateId]
    );

    // Insert booking
    const [result] = await conn.execute(
      `INSERT INTO bookings
        (venue_id, venue_name, date_id, workshop_date, workshop_time, first_name, last_name, email, phone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        venueId,
        venueName,
        dateId,
        date,
        time,
        firstName,
        lastName,
        email,
        phone,
      ]
    );

    // Read the updated seats (still inside transaction)
    const [after] = await conn.execute(
      `SELECT seats_available FROM workshop_dates WHERE date_id = ?`,
      [dateId]
    );

    await conn.commit();

    return res.status(201).json({
      ok: true,
      bookingId: result.insertId,
      seatsAvailable: Number(after[0]?.seats_available ?? seatsAvailable - 1),
    });
  } catch (err) {
    await conn.rollback();

    // Duplicate booking (uniq_email_date)
    if (err?.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        ok: false,
        error: "You have already booked this workshop date with this email.",
      });
    }

    console.error(err);
    return res.status(500).json({ ok: false, error: "Server error." });
  } finally {
    conn.release();
  }
});

export default router;
