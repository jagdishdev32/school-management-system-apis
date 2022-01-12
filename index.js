const express = require("express");

// Enabling Environment Variables
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Hello from Express" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running at PORT ", PORT));
