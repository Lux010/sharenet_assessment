USE sharenet_workshops;

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

INSERT INTO workshop_dates
(venue_id, venue_name, city, address, date_id, workshop_date, workshop_time, seats_total, seats_available)
VALUES
(1, 'Cape Town – Bella Rosa', 'Cape Town', 'Bella Rosa Village, 1 Village Crescent, Bellville', 101, '2026-02-20', '10:00', 30, 12),
(1, 'Cape Town – Bella Rosa', 'Cape Town', 'Bella Rosa Village, 1 Village Crescent, Bellville', 102, '2026-02-28', '10:00', 30, 0),
(1, 'Cape Town – Bella Rosa', 'Cape Town', 'Bella Rosa Village, 1 Village Crescent, Bellville', 103, '2026-03-05', '14:00', 20, 4),
(2, 'Johannesburg – Sandton', 'Johannesburg', 'Sandton, Johannesburg', 201, '2026-02-22', '09:00', 25, 0),
(2, 'Johannesburg – Sandton', 'Johannesburg', 'Sandton, Johannesburg', 202, '2026-03-02', '09:00', 25, 9),
(3, 'Durban – Umhlanga', 'Durban', 'Umhlanga Ridge, Durban', 301, '2026-02-25', '11:00', 15, 6),
(3, 'Durban – Umhlanga', 'Durban', 'Umhlanga Ridge, Durban', 302, '2026-03-10', '11:00', 15, 0)
ON DUPLICATE KEY UPDATE
  seats_total = VALUES(seats_total),
  seats_available = VALUES(seats_available),
  venue_name = VALUES(venue_name),
  city = VALUES(city),
  address = VALUES(address),
  workshop_date = VALUES(workshop_date),
  workshop_time = VALUES(workshop_time);
