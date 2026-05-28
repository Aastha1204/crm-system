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
    ticketId: {

  type: String,

  unique: true,

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

module.exports = mongoose.model(

  "Ticket",

  ticketSchema

);