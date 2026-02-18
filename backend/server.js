import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookingsRouter from "./routes/bookings.js";
import workshopsRouter from "./routes/workshops.js";
import { seedDatabase } from "./seed.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/bookings", bookingsRouter);
app.use("/api/workshops", workshopsRouter);

const PORT = process.env.PORT || 3000;

await seedDatabase();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
