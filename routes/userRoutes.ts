import express from "express";
import { register, authUser, getAllUsers } from "../controllers/userController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.route("/register").post(register);
router.post("/login", authUser);

router.route("/").get(protect, getAllUsers);

export default router;
