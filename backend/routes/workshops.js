import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const onlyAvailable = req.query.onlyAvailable === "true";

    const sql = `
      SELECT
        venue_id,
        venue_name,
        city,
        address,
        date_id,
        workshop_date,
        workshop_time,
        seats_total,
        seats_available
      FROM workshop_dates
      ${onlyAvailable ? "WHERE seats_available > 0" : ""}
      ORDER BY venue_name ASC, workshop_date ASC, workshop_time ASC
    `;

    const [rows] = await pool.execute(sql);

    const map = new Map();

    for (const r of rows) {
      const venueId = Number(r.venue_id);

      if (!map.has(venueId)) {
        map.set(venueId, {
          id: venueId,
          name: r.venue_name,
          city: r.city || "",
          address: r.address || "",
          dates: [],
        });
      }

      map.get(venueId).dates.push({
        id: Number(r.date_id),
        date: String(r.workshop_date),
        time: String(r.workshop_time),
        seatsTotal: Number(r.seats_total),
        seatsAvailable: Number(r.seats_available),
      });
    }

    res.json({ ok: true, venues: Array.from(map.values()) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Server error." });
  }
});

export default router;
