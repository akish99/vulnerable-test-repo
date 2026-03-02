```javascript
const express = require("express");
const app = express();
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database'
};

app.get("/user", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = "SELECT * FROM users WHERE id=?";
    const [result] = await connection.execute(query, [req.query.id]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```
Note: This is a basic example and you should consider implementing additional security measures such as input validation, authentication and authorization, and error handling.