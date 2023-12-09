import mongoose, { Types } from "mongoose";

interface IUserDocument extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: Types.ObjectId;
  latestMessage: Types.ObjectId;
  groupAdmin: Types.ObjectId;
  timestamps: boolean;
  _id?: Types.ObjectId;
}

type UserModel = mongoose.Model<IUserDocument, {}>;

const ChatModel = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserDocument, UserModel>("Chat", ChatModel);
