import express, { type Request, type Response } from "express";

import cors from "cors";
import pool from "./configs/db.js";
import { initializeDatabase } from "./configs/initDb.js";
import authRoute from "./routes/auth.route.js";
import { sendResponse } from "./utils/response.util.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);

app.get("/", (_req, res) => {
  sendResponse(res, {
    returncode: "300",
    message: "AdEX API V1.0.0 is working...",
  });
});

async function startServer() {
  await initializeDatabase();

  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
}

startServer();
