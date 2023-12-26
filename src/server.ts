import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "../routes/userRoutes";
import chatRoutes from "../routes/chatRoutes";
import messageRoutes from "../routes/messageRoutes";
import connectToDB from "../config/database";
import { notFound, errorHandler } from "../middleware/errorHandler";

dotenv.config();
const app = express();

//connect to database
connectToDB();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.process || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Api is Running");
});

app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});
