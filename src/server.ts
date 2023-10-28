import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "../routes/userRoutes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);

const PORT = process.env.process || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Api is Running");
});

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
