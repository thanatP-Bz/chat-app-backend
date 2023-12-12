import express from "express";
import { singup, authUser, getAllUsers } from "../controllers/userController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.route("/signup").post(singup);
router.post("/login", authUser);
router.route("/").get(protect, getAllUsers);

export default router;
