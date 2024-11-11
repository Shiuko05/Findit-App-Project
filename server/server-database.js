import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync("DigiCertGlobalRootG2.crt.pem"),
    },
  })
  .promise();

export async function getUserById(id) {
  const [row] = await pool.query("SELECT * FROM globalUsers WHERE iduser = ?", [
    id,
  ]);
  return row;
}

export async function getObjByUserId(id) {
  const [row] = await pool.query("SELECT * FROM objPerdido WHERE iduser = ?", [
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

export async function getUserByEmail(email) {
  const [row] = await pool.query("SELECT * FROM globalUsers WHERE email = ?", [
    email,
  ]);
  return row[0];
}

export async function getFindUserByEmail(email) {
  const [row] = await pool.query("SELECT * FROM globalUsers WHERE email = ?", [
    email,
  ]);
  return row[0];
}

export async function getAllUsers() {
  const [rows] = await pool.query("SELECT * FROM globalUsers");
  return rows;
}

export async function createUser(
  iduser,
  username,
  userapepat,
  userapemat,
  email,
  passuser,
  typeuser,
  isActiveUser
) {
  const [rows] = await pool.query(
    "INSERT INTO globalUsers (iduser, username, userapepat, userapemat, email, passuser, typeuser, isActiveUser) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      iduser,
      username,
      userapepat,
      userapemat,
      email,
      passuser,
      typeuser,
      isActiveUser,
    ]
  );
  return rows;
}

export async function updateUser(user) {
  const {
    username,
    userapepat,
    userapemat,
    passuser,
    email,
    typeuser,
    isActive,
    id,
  } = user;

  const [result] = await pool.query(
    `UPDATE globalUsers 
     SET username = ?, userapepat = ?, userapemat = ?, passuser = ?, email = ?, typeuser = ?, isActive = ? 
     WHERE email = ?`,
    [
      username,
      userapepat,
      userapemat,
      passuser,
      email,
      typeuser,
      isActive,
      email,
    ]
  );

  return result;
}

export async function createObjPerdido(
  iduser,
  imagenobj,
  nombreobj,
  objEstado,
  categoria,
  descripcion,
  hora,
  fecha,
  lugar,
  fechaPost,
  objEstatus
) {
  if (
    !iduser ||
    !nombreobj ||
    !objEstado ||
    !categoria ||
    !descripcion ||
    !hora ||
    !fecha ||
    !lugar ||
    !fechaPost ||
    !objEstatus
  ) {
    throw new Error("Faltan algunos valores requeridos");
  }
  const [rows] = await pool.query(
    "INSERT INTO objperdido (iduser, imagenobj, nombreobj, objEstado, categoria, descripcion, hora, fecha, lugar, fechaPost, objEstatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      iduser,
      imagenobj,
      nombreobj,
      objEstado,
      categoria,
      descripcion,
      hora,
      fecha,
      lugar,
      fechaPost,
      objEstatus,
    ]
  );
  return rows;
}

export async function getAllObjetosPerdidos() {
  const [rows] = await pool.query("SELECT * FROM objPerdido");
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
