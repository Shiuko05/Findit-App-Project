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

if (!pool) {
  console.log("Error al conectar con la base de datos");
} else {
  console.log("Conexión exitosa con la base de datos");
}

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

export async function getAllObjetosReclamados() {
  const query = `
    SELECT op.*, oreclam.*, gu.*
    FROM objperdido op
    JOIN objReclamaciones oreclam ON op.idobj = oreclam.idobj
    JOIN globalusers gu ON oreclam.iduser = gu.iduser;
  `;
  const [rows] = await pool.query(query);
  return rows;
}

export async function getAllObjectsByUsers() {
  const query = `
    SELECT op.*, gu.*
    FROM objperdido op
    JOIN globalusers gu ON op.iduser = gu.iduser
  `;

  const [rows] = await pool.query(query);
  return rows;
}

export const updateUserAvatar = async (iduser, avatarUrl) => {
  const [rows] = await pool.query(
    "UPDATE globalUsers SET avatarUrl = ? WHERE iduser = ?",
    [avatarUrl, iduser]
  );
  return rows;
};

export const updateUserPass = async (iduser, passuser) => {
  const [rows] = await pool.query(
    "UPDATE globalUsers SET passuser = ? WHERE iduser = ?",
    [passuser, iduser]
  );
  return rows;
};

export const deleteObjPerdido = async (id) => {
  const [rows] = await pool.query("DELETE FROM objperdido WHERE idobj = ?", [
    id,
  ]);
  return rows;
};

export const insertReclamation = async (
  idobj,
  iduser,
  fechaReclama,
  descripcionReclama,
  estadoReclama
) => {
  const [rows] = await pool.query(
    "INSERT INTO objReclamaciones (idobj, iduser, fechaReclama, descripcionReclama, estadoReclama) VALUES (?, ?, ?, ?, ?)",
    [idobj, iduser, fechaReclama, descripcionReclama, estadoReclama]
  );
  return rows;
};

export const getObjReclamation = async () => {
  const query = `
    SELECT * FROM globalusers;
  `;

  const [rows] = await pool.query(query);
  return rows;
};

export const getReclamations = async (iduser) => {
  const query = `
    SELECT * FROM objReclamaciones WHERE iduser = ?;
  `;
  const [rows] = await pool.query(query, [iduser]);
  return rows;
};

export const updateClaimReclama = async (
  idReclamacion,
  estadoReclama,
  idobj
) => {
  console.log(
    "Estado: ",
    estadoReclama,
    "IdReclama:",
    idReclamacion,
    "idobj:",
    idobj
  );
  const [rowsOne] = await pool.query(
    "UPDATE objreclamaciones SET estadoReclama = ? WHERE idReclamacion = ?",
    [estadoReclama, idReclamacion]
  );
  const [rowsTwo] = await pool.query(
    "UPDATE objperdido SET objEstatus = ? WHERE idobj = ?",
    [estadoReclama, idobj]
  );
  return rowsOne, rowsTwo;
};

export const sendNotificationClaim = async (
  iduser,
  idobj,
  fechaNotificacion,
  mensaje
) => {
  const [rows] = await pool.query(
    "INSERT INTO notifications (iduser, idobj, fechaNotificacion, mensaje) VALUES (?, ?, ?, ?)",
    [iduser, idobj, fechaNotificacion, mensaje]
  );
  return rows;
};

export const getObjById = async (idobj) => {
  const [rows] = await pool.query("SELECT * FROM objperdido WHERE idobj = ?", [
    idobj,
  ]);
  return rows;
};

export const getNotificationsByUser = async (iduser) => {
  const [rows] = await pool.query(
    "SELECT * FROM notifications WHERE iduser = ?",
    [iduser]
  );
  return rows;
};

export const getNotifications = async () => {
  const [rows] = await pool.query("SELECT * FROM notifications");
  return rows;
};
