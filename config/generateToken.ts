import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const secret: string = "secret";

const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;
