import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "../routes/userRoutes";
import chatRoutes from "../routes/chatRoutes";
import messageRoutes from "../routes/messageRoutes";
import connectToDB from "../config/database";
import { notFound, errorHandler } from "../middleware/errorHandler";
import { Server, Socket } from "socket.io";

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

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Api is Running");
});

const server = app.listen(PORT, () => {
  console.log(`listening to the port ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket: Socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData: any) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
});

io.on("connection_error", (err: any) => {
  console.error("Socket connection error:", err);
});
