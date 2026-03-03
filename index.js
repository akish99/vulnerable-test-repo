```javascript
const express = require("express");
const app = express();
const mysql = require("mysql2/promise");

const dbConfig = {
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
};

app.get("/user", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = "SELECT * FROM users WHERE id=?";
    const result = await connection.execute(query, [req.query.id]);
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    if (connection) {
      connection.end();
    }
  }
});

app.listen(3000);
```