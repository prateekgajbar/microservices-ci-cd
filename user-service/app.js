const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("User Service Running");
});

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Pratik" },
    { id: 2, name: "Rahul" }
  ]);
});

app.listen(3000, () => {
  console.log("User Service running on port 3000");
});