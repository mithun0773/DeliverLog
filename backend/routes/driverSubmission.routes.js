import express from "express";
import {
  createDriverSubmission,
  getDriverSubmission,
} from "../controllers/driverSubmission.controller.js";

const router = express.Router();

/**
 * POST - End of day driver submission
 */
router.post("/", createDriverSubmission);

/**
 * GET - Fetch submission for summary / PDF
 */
router.get("/", getDriverSubmission);

export default router;
