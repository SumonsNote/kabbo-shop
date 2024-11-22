import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "super-admin", "user", "manager"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});
export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
