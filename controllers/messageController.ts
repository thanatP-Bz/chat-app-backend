import Message from "../models/messageModel";
import User from "../models/userModel";
import Chat from "../models/chatModel";
import { Response, Request } from "express";

declare module "express" {
  interface Request {
    user?: any;
  }
}

const allMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = async (req: Request, res: Response) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    // Create a new message
    var message = await Message.create(newMessage);

    // Populate sender and chat fields
    await Message.populate(message, [
      { path: "sender", select: "name pic" },
      { path: "chat" },
    ]);

    // Populate users in the chat field
    await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update latestMessage in the chat
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { allMessages, sendMessage };
