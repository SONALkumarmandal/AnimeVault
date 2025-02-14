require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const Dbconnect = require("./utils/dbConnection.js");
const authRoute = require("./router/animeValt_Auth.js");
const homeRoute = require("./router/animeValt_homepage.js");

// Define allowed origins for development and production
const corsOptions = {
  origin: 'http://localhost:5173', // Corrected URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};


app.use(cors(corsOptions)); // Enable CORS
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(express.json());

// Define routes
app.use("/", authRoute);
app.use("/animevalt", homeRoute);

// Connect to DB and start the server
Dbconnect()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server started at port: 3000`);
    });
  })
  .catch((err) => {
    console.log("Server error: ", err);
  });