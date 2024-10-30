import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getUserById,
  getUserNameById,
  getAllUsers,
  createUser,
  createObjPerdido,
  getAllObjetosPerdidos,
  createObjEncontrado,
  getAllObjetosEncontrados,
  getObjByUserId,
  getUserByEmail,
  getFindUserByEmail,
} from "./server-database.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import admin from "firebase-admin";

const corsOptions = {
  origin: "http://158.23.50.124:8080",
  methods: ["GET", "POST"],
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/users/:id", async (req, res) => {
  const users = await getUserById(req.params.id);
  res.status(200).json(users);
});

app.get("/users", async (req, res) => {
  const users = await getAllUsers(req.params.id);
  res.status(200).json(users);
});

const JWT_SECRET = "your-secret-key";

app.post("/users/register", async (req, res) => {
  const { username, userapepat, userapemat, passuser, email, typeuser } =
    req.body;

  try {
    const hashedPassword = await bcrypt.hash(passuser, 10);
    const userToken = uuidv4();
    const isActiveUser = 1;

    const users = await createUser(
      username,
      userapepat,
      userapemat,
      email,
      hashedPassword,
      userToken,
      typeuser,
      isActiveUser
    );

    res.json(users);

    /*const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

    const verificationLink = `http://158.23.50.124/confirm/${token}`
    await transporter.sendMail({
      to: email,
      subject: 'Confirma tu cuenta en FindIt App',
      html: `<h1>Verifica tu cuenta</h1><p>Por favor, confirma tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Confirma tu cuenta</a>`,
    });*/

    /*res.status(201).json({
      message: 'Registro exitoso. Verifica tu correo para activar tu cuenta.',
      users});*/
  } catch (e) {
    res.status(500).json({ message: "Error en el registro", error: e.message });
  }
});

app.get("confirm/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await getFindUserByEmail(decoded.email);
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    if (!user.isActive) {
      user.isActive = true;
      await updateUser(true);
    }

    res.send("Cuenta confirmada. Ahora puedes iniciar sesión.");
  } catch (e) {}
});

app.get("/objs-p/:id", async (req, res) => {
  const objs = await getObjByUserId(req.params.id);
  res.status(200).json(objs);
});

/*app.get("/all-objs", async (req, res) => {
  const objs = await getAllObjetosPerdidos();
  res.status(200).json(objs);
});*/

app.get("/all-objs", async (req, res) => {
  const objs = await getAllObjetosPerdidos();

  const dataWithBase64Images = objs.map((item) => {
    return {
      ...item,
      imagenobj: `data:image/jpeg;base64,${item.imagenobj.toString("base64")}`, // Ajusta el tipo de imagen según sea necesario
    };
  });

  res.json(dataWithBase64Images);
});

app.post("/users/auth-login", async (req, res) => {
  const { email } = req.body;
  const users = await getUserByEmail(email);
  res.status(200).json(users);
});

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
