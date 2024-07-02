import mongoose, { model, Schema, Document, Mongoose } from "mongoose";
import { compare, hash } from "bcryptjs";

export type TransctionHistory = {
  source: String;
  destination: String;
  amount: Number;
  timestamps: Number;
  accountName: String;
};

interface UserDocument extends Document {
  accountId: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  balance: number;
  histories: any;
  role: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    accountId: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    balance: {
      type: Number,
      require: true,
      default: 0,
    },
    histories: {
      type: Array,
      default: [],
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password);
};

userSchema.set("toJSON", {
  //transform: (doc: any, { __v, password, ...rest }: any, options: any) => rest,
});

export const User = model<UserDocument>("User", userSchema);
