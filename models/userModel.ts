import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";

interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
  _id: Types.ObjectId;
  chatName: string;
  isGroupChat: boolean;
  users: Types.ObjectId[];
  latestMessage: Types.ObjectId;
  groupAdmin: Types.ObjectId;
  timestamps: boolean;
}

interface IUserMethods extends IUserDocument {
  _id: Types.ObjectId;
  matchPassword(password: string): Promise<boolean>;
}

type UserModel = mongoose.Model<IUserDocument, {}, IUserMethods>;

const UserSchema = new Schema<IUserDocument, UserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model<IUserDocument, UserModel>("User", UserSchema);
