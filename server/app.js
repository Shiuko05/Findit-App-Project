import express from "express";
import {
  getUserById,
  getUserNameById,
  getAllUsers,
  createUser,
  createObjPerdido,
  getAllObjetosPerdidos,
  createObjEncontrado,
  getAllObjetosEncontrados,
} from "./database.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
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

app.post("/users", async (req, res) => {
  const {
    username,
    userapepat,
    userapemat,
    nocontrol,
    passuser,
    email,
    typeuser,
  } = req.body;
  const users = await createUser(
    username,
    userapepat,
    userapemat,
    nocontrol,
    passuser,
    email,
    typeuser
  );
  res.status(201).json(users);
});

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
