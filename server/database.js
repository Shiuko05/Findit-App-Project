import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  })
  .promise();

export async function getUserNameById(id) {
  const [row] = await pool.query("SELECT * FROM globalUsers WHERE iduser = ?", [
    id,
  ]);
  return row[0];
}
