import express from "express";
import { register } from "../controllers/userController";

const router = express.Router();

router.route("/register").post(register);
/* router.route('/login').post(authUser)  */

export default router;
