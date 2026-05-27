const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Open",
    },

    priority: {
      type: String,
      default: "Medium",
    },

    notes: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);