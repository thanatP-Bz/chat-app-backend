import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../config/generateToken";

declare module "express" {
  interface Request {
    user?: any;
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  /* not currently log in */
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  try {
    res.status(200).send(users);
  } catch (error: any) {
    res.status(404).json({ message: "User Not Found" });
  }
};

/* signup */
const singup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Please provide all values" });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
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
      res.status(200).json({ message: "User Created!" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
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
      res.status(500).json({ message: "User not Found" });
    }
  } catch (error) {
    res.json({ message: error });
  }
});

export { singup, authUser, getAllUsers };
