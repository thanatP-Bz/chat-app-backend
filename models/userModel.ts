import mongoose, { Schema, Model } from "mongoose";
import bcrypt from "bcrypt";

interface IUserDocument extends Document {
  name: string;
  email: string;
  password: string;
  pic: string;
  isAdmin: boolean;
}

interface IUserMethods extends Model<IUserDocument> {
  matchPassword: (password: string) => Promise<boolean>;
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
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Comparison failed");
  }
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User: IUserMethods = mongoose.model<IUserDocument, IUserMethods>(
  "User",
  UserSchema
);
export { User };
