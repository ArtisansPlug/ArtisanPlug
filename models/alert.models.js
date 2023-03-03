const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const alertSchema = new mongoose.Schema(
  {
    information: {
      type: String,
      minlength: [3, "Full name must be at least 3 characters long"],
    },
    isActive: {
      type: Boolean,
      default: false
    },
  },
  
  {
    timestamps: true,
  }
);

const alert = mongoose.model("Alert", alertSchema);
module.exports = alert;
