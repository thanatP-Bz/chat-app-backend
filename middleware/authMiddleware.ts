import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";

interface JWTPayload {
  id: string;
}

declare module "express" {
  interface Request {
    user?: any;
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | null = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        //decodes token id
        const decoded = jwt.verify(token, "SECRET") as JWTPayload;

        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error("Token verification error:", error);
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
};

export default protect;
