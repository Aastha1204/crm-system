require("dotenv").config();

const express = require("express");

const cors = require("cors");

const connectDB = require("./config/db");

const ticketRoutes = require("./routes/ticketRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());


// ROUTES

app.use("/api/tickets", ticketRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {

  res.send("CRM API Running");

});


app.listen(5000, () => {

  console.log("Server Running on Port 5000");

});