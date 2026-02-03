import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    packageId: {
      type: String,
      required: true,
      trim: true,
    },
    storeCode: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["RETURN", "ATTEMPT"],
      required: true,
    },
    scanMethod: {
      type: String,
      enum: ["BARCODE", "MANUAL"],
      required: true,
    },
    scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scanDate: {
      type: String, // YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true },
);

// Optional index for faster queries
packageSchema.index({ storeCode: 1, scanDate: 1 });

export default mongoose.model("Package", packageSchema);
