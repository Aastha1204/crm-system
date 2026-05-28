const express = require("express");

const router = express.Router();

const Ticket = require("../models/Ticket");
const sendEmail = require("../services/sendEmail");


// CREATE TICKET

router.post("/", async (req, res) => {

  try {

    const {
      customerName,
      customerEmail,
      subject,
      description,
    } = req.body;


    let priority = "Medium";

    if (
      description.toLowerCase().includes("urgent")
    ) {

      priority = "High";

    }


    const ticket = await Ticket.create({

      customerName,
      customerEmail,
      subject,
      description,
      priority,

    });

    await sendEmail(

  ticket.customerEmail,

  "Ticket Created Successfully",

  `

  Hello ${ticket.customerName},

  Your ticket has been created successfully 😭🔥

  Subject: ${ticket.subject}

  Status: ${ticket.status}

  Priority: ${ticket.priority}

  `

);


    res.status(201).json(ticket);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

// SEARCH TICKETS

router.get("/", async (req, res) => {

  try {

    const search = req.query.search || "";

    const status = req.query.status;

    let query = {};

    if (status) {

      query.status = status;

    }

    const tickets = await Ticket.find({

      ...query,
      $or: [

        {
          customerName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          subject: {
            $regex: search,
            $options: "i",
          },
        },

      ],

    });

    res.json(tickets);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});
// GET SINGLE TICKET

router.get("/:id", async (req, res) => {

  try {

    const ticket = await Ticket.findById(

      req.params.id
    );

    res.json(ticket);

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

});
// UPDATE TICKET

router.put("/:id", async (req, res) => {

  try {

    const { status, note } = req.body;

    const ticket = await Ticket.findById(

      req.params.id

    );

    if (!ticket) {

      return res.status(404).json({

        message: "Ticket not found",

      });

    }


    // UPDATE STATUS

    if (status) {

      ticket.status = status;

    }


    // ADD NOTE

    if (note) {

      ticket.notes.push(note);

    }


    await ticket.save();


    res.json({

      message: "Ticket Updated Successfully",

      ticket,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

});
// DASHBOARD STATS

router.get("/stats/dashboard", async (req, res) => {

  try {

    const totalTickets =
      await Ticket.countDocuments();

    const openTickets =
      await Ticket.countDocuments({
        status: "Open",
      });

    const closedTickets =
      await Ticket.countDocuments({
        status: "Closed",
      });

    const highPriority =
      await Ticket.countDocuments({
        priority: "High",
      });


    res.json({

      totalTickets,

      openTickets,

      closedTickets,

      highPriority,

    });

  } catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

});
module.exports = router;