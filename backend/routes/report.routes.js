import express from "express";
import {
  getDailyStoreReport,
  getDailyAssociateReport,
  getMonthlyStoreReport,
} from "../controllers/report.controller.js";

const router = express.Router();

/**
 * Daily store report
 */
router.get("/daily-store", getDailyStoreReport);

/**
 * Daily associate report
 */
router.get("/daily-associate", getDailyAssociateReport);

/**
 * Monthly store report
 */
router.get("/monthly-store", getMonthlyStoreReport);

export default router;
