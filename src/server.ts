import express from "express";
import { Request, Response } from "express";
import { chats } from "../data/data.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.process || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Api is Running");
});

app.get("/api/chats", (req: Request, res: Response) => {
  res.send(chats);
});

app.get("/api/chats/:id", (req: Request, res: Response) => {
  console.log(req.params.id);
});

app.get("/api/chats", (req: Request, res: Response) => {
  res.send(chats);
});

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
