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
  getAllObjetosReclamados,
  getObjByUserId,
  getUserByEmail,
  getFindUserByEmail,
  getAllObjectsByUsers,
  updateUserAvatar,
  updateUserPass,
  deleteObjPerdido,
  insertReclamation,
  getObjWithReclamation,
  updateClaimReclama,
} from "./server-database.js";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import admin from "firebase-admin";
import config from "../client/config/config.js";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";

const corsOptions = {
  origin: `http://${config.BASE_URL}:8080`,
  methods: ["GET", "POST", "PUT", "DELETE", "USE"],
  credentials: true,
};

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `uploads/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    let fileExtension = "";
    switch (file.mimetype) {
      case "image/jpeg":
        fileExtension = ".jpg";
        break;
      case "image/png":
        fileExtension = ".png";
        break;
      case "image/gif":
        fileExtension = ".gif";
        break;
      default:
        fileExtension = ""; // Si no hay un tipo conocido, lo dejamos vacío
    }
    const fileName = `${Date.now()}${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
});
// uploads/avatar/
// Configuración de storage para avatares
const storageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `uploads/avatar/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    let fileExtension = "";
    switch (file.mimetype) {
      case "image/jpeg":
        fileExtension = ".jpg";
        break;
      case "image/png":
        fileExtension = ".png";
        break;
      case "image/gif":
        fileExtension = ".gif";
        break;
      default:
        fileExtension = ""; // Si no hay un tipo conocido, lo dejamos vacío
    }
    const fileName = `${Date.now()}${fileExtension}`;
    cb(null, fileName);
  },
});

// Inicializa el multer para avatares
const uploadAvatar = multer({
  storage: storageAvatar,
});

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
    const iduser = uuidv4();
    const isActiveUser = 1;

    const users = await createUser(
      iduser,
      username,
      userapepat,
      userapemat,
      email,
      hashedPassword,
      typeuser,
      isActiveUser
    );

    res.json(users);
  } catch (e) {
    res.status(500).json({
      message: "Error en el registro by connection bd",
      error: e.message,
    });
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
  res.status(200).json(objs);
});

app.get("/all-claims-objs", async (req, res) => {
  const objs = await getAllObjetosReclamados();
  res.status(200).json(objs);
});

app.get("/all-objs-user", async (req, res) => {
  const objs = await getAllObjectsByUsers();
  res.status(200).json(objs);
});

app.post("/users/auth-login", async (req, res) => {
  const { email } = req.body;
  const users = await getUserByEmail(email);
  res.status(200).json(users);
});

app.post("/objs/post-p", upload.single("imagenobj"), async (req, res) => {
  const {
    iduser,
    nombreobj,
    objEstado,
    categoria,
    descripcion,
    hora,
    fecha,
    lugar,
    fechaPost,
    objEstatus,
  } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Imagen requerida" });
  }

  const imagenobj = req.file ? req.file.filename : null;
  console.log("Imagen: ", imagenobj);
  const imageUrl = `http://${config.BASE_URL}:8080/uploads/${imagenobj}`;

  try {
    const obj = await createObjPerdido(
      iduser,
      imageUrl,
      nombreobj,
      objEstado,
      categoria,
      descripcion,
      hora,
      fecha,
      lugar,
      fechaPost,
      objEstatus
    );

    res.status(201).json({
      message: "Objeto perdido registrado exitosamente.",
      obj,
      imageUrl: imageUrl,
    });

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

app.use("/uploads", express.static("uploads"));

app.post(
  "/users/upload-avatar",
  uploadAvatar.single("avatar"),
  async (req, res) => {
    const { iduser } = req.body; // Asegúrate de que `iduser` esté en el body de la request.

    if (!req.file) {
      return res.status(400).json({ message: "Imagen de avatar requerida" });
    } else {
      console.log("Avatar subido correctamente");
    }

    const user = await getUserById(iduser);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      console.log("Usuario encontrado");
    }

    const avatarFilename = req.file.filename;
    console.log("Avatar: ", avatarFilename, "ID: ", iduser);
    const avatarUrl = `http://${config.BASE_URL}:8080/uploads/avatar/${avatarFilename}`;

    try {
      // Actualiza el avatar del usuario en la base de datos
      const user = await updateUserAvatar(iduser, avatarUrl);

      res.status(201).json({
        message: "Avatar actualizado exitosamente.",
        avatarUrl: avatarUrl,
        user,
      });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Error al subir el avatar", error: e.message });
    }
  }
);

app.use("/uploads/avatar", express.static("uploads/avatar"));

app.post("/users/upload-userpass", async (req, res) => {
  const { iduser, passuser } = req.body;

  // Verificar si los campos requeridos existen
  if (!iduser || !passuser) {
    return res.status(400).json({
      message: "Faltan datos necesarios: iduser o passuser",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(passuser, 10);

    const user = await updateUserPass(iduser, hashedPassword);

    res.status(201).json({
      message: "Contraseña actualizada exitosamente.",
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Error al actualizar la contraseña",
      error: e.message,
    });
  }
});

app.post("/all-objs/delete", async (req, res) => {
  const { idobj } = req.body;
  const objs = await deleteObjPerdido(idobj);
  res.status(200).json(objs);
});

app.post("/objs-p/claim", async (req, res) => {
  const { idobj, iduser, fechaReclama, descripcionReclama, estadoReclama } =
    req.body;
  console.log(idobj, iduser, fechaReclama, descripcionReclama, estadoReclama);
  const objs = await insertReclamation(
    idobj,
    iduser,
    fechaReclama,
    descripcionReclama,
    estadoReclama
  );
  res.status(200).json(objs);
});

app.get("/objs/reclamations", async (req, res) => {
  const objs = await getObjWithReclamation(req.params.id);
  res.status(200).json(objs);
});

app.post("/objs/update-reclamation", async (req, res) => {
  const { idReclamacion, estadoReclama, idobj } = req.body;
  const objs = await updateClaimReclama(idReclamacion, estadoReclama, idobj);
  res.status(200).json(objs);
});

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
