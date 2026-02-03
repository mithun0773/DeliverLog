import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String, // hashed later
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "ASSOCIATE"],
      default: "ASSOCIATE",
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
