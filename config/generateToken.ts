import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.SECRET as string, {
    expiresIn: "30d",
  });
};

export default generateToken;
