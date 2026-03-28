const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Payment Service Running");
});

app.get("/payments", (req, res) => {
  res.json([
    { id: 201, amount: 5000, status: "Success" },
    { id: 202, amount: 1200, status: "Failed" }
  ]);
});

app.listen(3000, () => {
  console.log("Payment Service running on port 3000");
});