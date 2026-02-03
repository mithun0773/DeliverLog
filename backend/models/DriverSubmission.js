import mongoose from "mongoose";

const driverSubmissionSchema = new mongoose.Schema(
  {
    storeCode: {
      type: String,
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    driverName: {
      type: String,
      required: true,
      trim: true,
    },
    signatureImage: {
      type: String, // base64 image
      required: true,
    },
    totalReturns: {
      type: Number,
      required: true,
    },
    totalAttempts: {
      type: Number,
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// Ensure only one submission per store per day
driverSubmissionSchema.index({ storeCode: 1, date: 1 }, { unique: true });

export default mongoose.model("DriverSubmission", driverSubmissionSchema);
