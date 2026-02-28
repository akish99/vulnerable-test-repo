const express = require("express");
const app = express();

const password = "123456"; // Hardcoded secret

app.get("/user", (req, res) => {
  const query = "SELECT * FROM users WHERE id=" + req.query.id;
  res.send(query);
});

app.listen(3000);
