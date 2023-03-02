const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const providerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,

    },
    reviews: {
      type: [String],
    },
    ratings: {
type: [Number],
enum: [1,2,3,4,5]
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      trim: true,
    },
    password: {
      type: String,
    },

    location: {
      type: String,
    },
   category: {
    type: String,
   }
  },
  {
    timestamps: true,
    // versionKey: false,
  }
);

module.exports = mongoose.model("Provider", providerSchema);
