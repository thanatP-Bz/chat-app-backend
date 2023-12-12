import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../config/generateToken";

/* get all users */
/* declare module "express" {
  interface Request {
    user?: any;
  }
}
 */
const getAllUsers = async (req: Request, res: Response) => {
  console.log("get all user");
};

/* signup */
const singup = async (req: Request, res: Response) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all values");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the User");
  }
};

/* auth user */
const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const checkMatchPassword = await user?.matchPassword(password);

  try {
    if (user && checkMatchPassword) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).json({ message: "something went wrong" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

export { singup, authUser, getAllUsers };
