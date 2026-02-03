import DriverSubmission from "../models/DriverSubmission.js";
import Package from "../models/Package.js";
import { getTodayDate } from "../utils/date.utils.js";

/**
 * CREATE DRIVER SUBMISSION (End of day)
 */
export const createDriverSubmission = async (req, res) => {
  try {
    const { storeCode, driverName, signatureImage, submittedBy, date } =
      req.body;

    const submissionDate = date || getTodayDate();

    // 🔒 Validation
    if (!storeCode || !driverName || !signatureImage || !submittedBy) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // 🚫 Prevent duplicate submission for same store + day
    const alreadySubmitted = await DriverSubmission.findOne({
      storeCode,
      date: submissionDate,
    });

    if (alreadySubmitted) {
      return res.status(409).json({
        message: "Driver submission already exists for this store today",
      });
    }

    // 📊 Calculate totals from packages
    const totalReturns = await Package.countDocuments({
      storeCode,
      scanDate: submissionDate,
      type: "RETURN",
    });

    const totalAttempts = await Package.countDocuments({
      storeCode,
      scanDate: submissionDate,
      type: "ATTEMPT",
    });

    const submission = await DriverSubmission.create({
      storeCode,
      date: submissionDate,
      driverName,
      signatureImage,
      totalReturns,
      totalAttempts,
      submittedBy,
    });

    return res.status(201).json({
      message: "Driver submission completed successfully",
      data: submission,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating driver submission",
      error: error.message,
    });
  }
};

/**
 * GET DRIVER SUBMISSION (For summary / PDF)
 */
export const getDriverSubmission = async (req, res) => {
  try {
    const { store, date } = req.query;

    if (!store || !date) {
      return res.status(400).json({
        message: "Store and date are required",
      });
    }

    const submission = await DriverSubmission.findOne({
      storeCode: store,
      date,
    });

    if (!submission) {
      return res.status(404).json({
        message: "No submission found",
      });
    }

    return res.status(200).json(submission);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching driver submission",
      error: error.message,
    });
  }
};
