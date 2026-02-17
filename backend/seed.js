import { pool } from "./db.js";

export async function seedDatabase() {
  const conn = await pool.getConnection();

  try {
    console.log("Running DB migrations...");

    await conn.query(`
      CREATE TABLE IF NOT EXISTS workshop_dates (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        venue_id INT NOT NULL,
        venue_name VARCHAR(255) NOT NULL,
        city VARCHAR(100) NULL,
        address VARCHAR(255) NULL,
        date_id INT NOT NULL,
        workshop_date DATE NOT NULL,
        workshop_time VARCHAR(10) NOT NULL,
        seats_total INT NOT NULL,
        seats_available INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_date_id (date_id)
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        venue_id INT NOT NULL,
        venue_name VARCHAR(255) NOT NULL,
        date_id INT NOT NULL,
        workshop_date DATE NOT NULL,
        workshop_time VARCHAR(10) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_email_date (email, date_id)
      );
    `);

    await conn.query(`
      INSERT INTO workshop_dates
      (venue_id, venue_name, city, address, date_id, workshop_date, workshop_time, seats_total, seats_available)
      VALUES
      (1, 'Cape Town – Bella Rosa', 'Cape Town', 'Bella Rosa Village, Bellville', 101, '2026-02-20', '10:00', 30, 12),
      (1, 'Cape Town – Bella Rosa', 'Cape Town', 'Bella Rosa Village, Bellville', 102, '2026-02-28', '10:00', 30, 0),
      (1, 'Cape Town – Bella Rosa', 'Cape Town', 'Bella Rosa Village, Bellville', 103, '2026-03-05', '14:00', 20, 4)
      ON DUPLICATE KEY UPDATE seats_available = VALUES(seats_available);
    `);

    console.log("Database ready.");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    conn.release();
  }
}
