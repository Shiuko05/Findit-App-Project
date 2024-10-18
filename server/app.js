import express from "express";
import { getUserNameById } from "./database.js";

const app = express();
app.use(express.json());

app.get("/users/:id", async (req, res) => {
  const users = await getUserNameById(req.params.id);
  res.status(200).json(users);
});

app.listen(8080, () => {
  console.log("Server is running on 8080");
});
