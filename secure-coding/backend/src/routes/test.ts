import { Router } from "express";
import { open } from "sqlite";

const sqlite3 = require("sqlite3");
const router = Router();

router.get("/sqli1", async (req: any, res) => {
  const sqlitedb = await open({
    filename: "./src/db/main.db",
    driver: sqlite3.Database,
  });

  let sqlStatement = "SELECT * FROM users";

  const results = await sqlitedb.all(sqlStatement);

  res.json({ results });
});

export default router;
