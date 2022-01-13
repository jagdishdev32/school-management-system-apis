const express = require("express");

// Enabling Environment Variables
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "Hello from Express" });
});

const studentsRoute = require("./routes/students.routes");
const classesRoute = require("./routes/classes.routes");
const teachersRoute = require("./routes/teachers.routes");

app.use("/students", studentsRoute);
app.use("/classes", classesRoute);
app.use("/teachers", teachersRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running at PORT ", PORT));
