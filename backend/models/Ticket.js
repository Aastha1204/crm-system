const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
    },

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
      enum: ["Open", "Closed", "In Progress"],
      default: "Open",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    notes: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

ticketSchema.pre("save", async function () {

  if (!this.ticketId) {

    const count = await mongoose
      .model("Ticket")
      .countDocuments();

    this.ticketId = `TKT-${String(
      count + 1
    ).padStart(3, "0")}`;

  }

});

module.exports = mongoose.model("Ticket", ticketSchema);