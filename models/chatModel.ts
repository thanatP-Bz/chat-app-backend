import mongoose, { Types, Model } from "mongoose";

interface IChatDocument extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: Types.ObjectId[];
  latestMessage: Types.ObjectId;
  groupAdmin: Types.ObjectId;
  timestamps: boolean;
  _id?: Types.ObjectId;
}

type ChatModel = Model<IChatDocument, {}>;

const ChatSchema = new mongoose.Schema<IChatDocument, ChatModel>(
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

export default mongoose.model<IChatDocument, ChatModel>("Chat", ChatSchema);
