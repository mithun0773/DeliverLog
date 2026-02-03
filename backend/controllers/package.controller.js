import Package from "../models/Package.js";
import { getTodayDate } from "../utils/date.utils.js";

// ✅ IMPORTANT: Register User model for future populate (safe even if unused now)
import "../models/User.js";

/**
 * CREATE PACKAGE
 * Used for barcode scan or manual entry
 */
export const createPackage = async (req, res) => {
  try {
    const { packageId, storeCode, type, scanMethod, scannedBy, scanDate } =
      req.body;

    // 🔒 Validation
    if (!packageId || !storeCode || !type || !scanMethod || !scannedBy) {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    // Optional: prevent duplicate package for same store + date
    const existingPackage = await Package.findOne({
      packageId,
      storeCode,
      scanDate: scanDate || getTodayDate(),
    });

    if (existingPackage) {
      return res.status(409).json({
        message: "Package already scanned for this store today",
      });
    }

    const newPackage = await Package.create({
      packageId,
      storeCode,
      type,
      scanMethod,
      scannedBy,
      scanDate: scanDate || getTodayDate(),
    });

    return res.status(201).json({
      message: "Package stored successfully",
      data: newPackage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating package",
      error: error.message,
    });
  }
};

/**
 * GET PACKAGES
 * Supports day-wise, store-wise, type-wise, associate-wise retrieval
 */
export const getPackages = async (req, res) => {
  try {
    const { date, store, type, scannedBy } = req.query;

    let filter = {};

    if (date) filter.scanDate = date;
    if (store) filter.storeCode = store;
    if (type) filter.type = type;
    if (scannedBy) filter.scannedBy = scannedBy;

    const packages = await Package.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching packages",
      error: error.message,
    });
  }
};

/**
 * DELETE PACKAGE (Optional – for corrections)
 */
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Package.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Package not found",
      });
    }

    return res.status(200).json({
      message: "Package deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting package",
      error: error.message,
    });
  }
};
