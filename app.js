const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const users = [];

// Health check endpoint
app.get("/health", (req, res) => {
  res.send("API is running");
});

// Endpoint to store a user
app.post("/users", (req, res) => {
  const { name, lastName } = req.body;
  const id = uuidv4();
  const user = { id, name, lastName };
  users.push(user);
  res.status(201).json(user);
});

// Endpoint to retrieve all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
