```javascript
const express = require("express");
const app = express();
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "username",
  password: "password",
  database: "database"
};

async function getUser(req, res) {
  const connection = await mysql.createConnection(dbConfig);
  const query = "SELECT * FROM users WHERE id=?";
  try {
    const result = await connection.execute(query, [req.query.id]);
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching user");
  } finally {
    connection.end();
  }
}

app.get("/user", getUser);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```