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

      default: "Open",

    },

    priority: {

      type: String,

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


// AUTO GENERATE TICKET ID

ticketSchema.pre("save", async function (next) {

  if (!this.ticketId) {

    const count = await mongoose
    .model("Ticket")
    .countDocuments();

    this.ticketId = `TKT-${1000 + count + 1}`;

  }

  next();

});


module.exports = mongoose.model(

  "Ticket",

  ticketSchema

);