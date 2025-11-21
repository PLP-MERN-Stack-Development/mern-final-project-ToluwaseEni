const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // ADD ROLE HERE
    role: {
      type: String,
      enum: ["buyer", "designer"],
      default: "buyer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
