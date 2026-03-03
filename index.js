```javascript
const express = require("express");
const app = express();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
};

app.get("/user", async (req, res) => {
  const id = req.query.id;
  if (!id) {
    res.status(400).send({ error: "ID is required" });
    return;
  }

  try {
    const db = await mysql.createConnection(dbConfig);
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```