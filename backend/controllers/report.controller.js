import Package from "../models/Package.js";

/**
 * DAILY STORE REPORT
 * date + store → return count, attempt count, total
 */
export const getDailyStoreReport = async (req, res) => {
  try {
    const { date, store } = req.query;

    if (!date || !store) {
      return res.status(400).json({
        message: "date and store are required",
      });
    }

    const report = await Package.aggregate([
      {
        $match: {
          scanDate: date,
          storeCode: store,
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    let result = {
      date,
      store,
      total: 0,
      RETURN: 0,
      ATTEMPT: 0,
    };

    report.forEach((r) => {
      result[r._id] = r.count;
      result.total += r.count;
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching daily store report",
      error: error.message,
    });
  }
};

/**
 * DAILY DELIVERY ASSOCIATE REPORT
 * date + store → packages handled by each associate
 */
export const getDailyAssociateReport = async (req, res) => {
  try {
    const { date, store } = req.query;

    if (!date || !store) {
      return res.status(400).json({
        message: "date and store are required",
      });
    }

    const report = await Package.aggregate([
      {
        $match: {
          scanDate: date,
          storeCode: store,
        },
      },
      {
        $group: {
          _id: "$scannedBy",
          totalPackages: { $sum: 1 },
          returns: {
            $sum: {
              $cond: [{ $eq: ["$type", "RETURN"] }, 1, 0],
            },
          },
          attempts: {
            $sum: {
              $cond: [{ $eq: ["$type", "ATTEMPT"] }, 1, 0],
            },
          },
        },
      },
    ]);

    return res.status(200).json(report);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching associate report",
      error: error.message,
    });
  }
};

/**
 * MONTHLY STORE REPORT
 * month (YYYY-MM) + store
 */
export const getMonthlyStoreReport = async (req, res) => {
  try {
    const { month, store } = req.query;

    if (!month || !store) {
      return res.status(400).json({
        message: "month and store are required",
      });
    }

    const startDate = `${month}-01`;
    const endDate = `${month}-31`;

    const report = await Package.aggregate([
      {
        $match: {
          storeCode: store,
          scanDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
    ]);

    let result = {
      month,
      store,
      total: 0,
      RETURN: 0,
      ATTEMPT: 0,
    };

    report.forEach((r) => {
      result[r._id] = r.count;
      result.total += r.count;
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching monthly store report",
      error: error.message,
    });
  }
};
