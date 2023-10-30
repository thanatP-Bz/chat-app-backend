import express from "express";
import { register, authUser } from "../controllers/userController";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(authUser);

export default router;
