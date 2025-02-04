// Very simple script that runs SQL found in ./sql/write_sql_here.sql when npm run runSql is executed.

import fs from "fs";
import mysql from "mysql2/promise";

(async () => {
  const sql = fs.readFileSync("src/sql/write_sql_here.sql", "utf8");
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysqlpass",
    database: "db"
  });
  await connection.query(sql);
  await connection.end();
  console.log("SQL script executed successfully.");
})();