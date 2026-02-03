import express from "express";
import {
  createPackage,
  getPackages,
} from "../controllers/package.controller.js";

const router = express.Router();

/**
 * @route   POST /api/packages
 * @desc    Create a new package (scan / manual entry)
 */
router.post("/", createPackage);

/**
 * @route   GET /api/packages
 * @desc    Get packages (day-wise / store-wise / type-wise)
 * @query   date, store, type, scannedBy
 */
router.get("/", getPackages);

export default router;
