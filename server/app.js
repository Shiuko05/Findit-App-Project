import express from "express";

const app = express();
app.use(express.json());

app.get("/users/id", async (req, res) => {
  const users = await getUserNameById(req.params.id);
  res.status(200).json(users);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
