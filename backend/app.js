import express from "express";
import cors from "cors";
import packageRoutes from "./routes/package.routes.js";
import driverSubmissionRoutes from "./routes/driverSubmission.routes.js";
import reportRoutes from "./routes/report.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/packages", packageRoutes);
app.use("/api/driver-submissions", driverSubmissionRoutes);
app.use("/api/reports", reportRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running");
});

export default app;
