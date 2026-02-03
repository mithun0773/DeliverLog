import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    storeCode: {
      type: String,
      required: true,
      unique: true, // STORE_1, STORE_2...
    },
    storeName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Store", storeSchema);
