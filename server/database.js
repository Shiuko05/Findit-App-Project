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

export async function getUserById(id) {
  const [row] = await pool.query("SELECT * FROM globalUsers WHERE iduser = ?", [
    id,
  ]);
  return row;
}

export async function getUserNameById(id) {
  const [row] = await pool.query(
    "SELECT username, userapepat, userapemat FROM globalUsers WHERE iduser = ?",
    [id]
  );
  return row[0];
}

export async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM globalUsers");
  return rows;
}

export async function createUser(
  username,
  userapepat,
  userapemat,
  nocontrol,
  passuser,
  email,
  typeuser
) {
  const [rows] = await pool.query(
    "INSERT INTO globalUsers (username, userapepat, userapemat, nocontrol, passuser, email, typeuser) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [username, userapepat, userapemat, nocontrol, passuser, email, typeuser]
  );
  return rows;
}

export async function createObjPerdido(
  iduser,
  nombreobj,
  descripcion,
  hora,
  fecha,
  lugar
) {
  const [rows] = await pool.query(
    "INSERT INTO objetosperdidos (iduser, nombreobj, descripcion, hora, fecha, lugar) VALUES (?, ?, ?, ?, ?, ?)",
    [iduser, nombreobj, descripcion, hora, fecha, lugar]
  );
  return rows;
}

export async function getAllObjetosPerdidos() {
  const [rows] = await pool.query("SELECT * FROM objetosperdidos");
  return rows;
}

export async function createObjEncontrado(
  iduser,
  nombreobj,
  descripcion,
  hora,
  fecha,
  lugar
) {
  const [rows] = await pool.query(
    "INSERT INTO objetosperdidos (iduser, nombreobj, descripcion, hora, fecha, lugar) VALUES (?, ?, ?, ?, ?, ?)",
    [iduser, nombreobj, descripcion, hora, fecha, lugar]
  );
  return rows;
}

export async function getAllObjetosEncontrados() {
  const [rows] = await pool.query("SELECT * FROM objetosperdidos");
  return rows;
}
