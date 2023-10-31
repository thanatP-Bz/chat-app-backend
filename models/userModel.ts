import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

interface IUserDocument {
  name: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
}

interface IUserMethods extends IUserDocument, Document {
  matchPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument, IUserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
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

UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  const user = this as IUserMethods;
  const result = await bcrypt.compare(enteredPassword, user.password);
  return result;
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUserDocument>("User", UserSchema);
export default User;
