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
  getObjByUserId,
} from "./server-database.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8080",
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

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
