import express from "express";
import protect from "../middleware/authMiddleware";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controllers/chatController";

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").patch(protect, renameGroup);
router.route("/groupmove").post(protect, removeFromGroup);
router.route("/").post(protect, addToGroup);

export default router;
