import mongoose, { Types } from "mongoose";

interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
  _id: Types.ObjectId;
  chatName: string;
  isGroupChat: boolean;
  users: Types.ObjectId;
  latestMessage: Types.ObjectId;
  groupAdmin: Types.ObjectId;
  timestamps: boolean;
}

interface IMessageDocument extends Document {
  _id: Types.ObjectId;
  sender: Types.ObjectId | IUserDocument;
  content: string;
  chat: Types.ObjectId;
}

const MessageSchema = new mongoose.Schema<IMessageDocument>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessageDocument>("Message", MessageSchema);
