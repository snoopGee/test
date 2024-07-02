import { Router, Request, Response } from "express";
import { User } from "../model";
import { Unauthorized } from "../errors";
import { JWT_ISS, JWT_SECRET } from "../config";
import dayjs from "dayjs";
const jwt = require("jsonwebtoken");
const router = Router();

import { TransctionHistory } from "../model/user";

import { jwtVerify } from "../middleware";

router.post("/auth", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  //if (!user || !(await user.matchesPassword(password))) {
  if (!user) {
    return res.status(400).send("Incorrect username or password");
  }

  const data = await {
    userId: user._id,
  };

  const token = await jwt.sign(data, JWT_SECRET);

  res
    .cookie("token", token, {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      expires: dayjs().add(1, "days").toDate(),
      domain:
        process.env.NODE_ENV === "development"
          ? "localhost"
          : ".mysecuritylabs.com",
    })
    .json({ user, token });
});

router.post("/admin", jwtVerify, async (req: Request, res: Response) => {
  const users = await User.find({});

  res.json({ users });
});

router.post("/user", jwtVerify, async (req: Request, res: Response) => {
  const username = req.body.username;

  const user = await User.findOne({ username });

  res.json({ user });
});

router.post("/register", async (req: Request, res: Response) => {
  const { firstname, lastname, username, email, password } = req.body;

  if (!firstname || !lastname || !username || !email || !password) {
    return res.status(400).send("Something went wrong");
  }

  const accountId = (
    Math.floor(Math.random() * 9000000000) + 1000000000
  ).toString();

  const user = await User.create({
    firstname,
    lastname,
    username,
    email,
    password,
    accountId,
    balance: Math.floor(Math.random() * 900000) + 100000,
  });

  res.json({ user });
});

router.post("/profile/edit", async (req: Request, res: Response) => {
  const { firstname, lastname, userId } = req.body;

  if (!firstname || !lastname || !userId) {
    return res.status(400).send("Something went wrong");
  }

  const user = await User.findByIdAndUpdate({ _id: userId }, { firstname, lastname });

  res.json({ user });
});

router.post("/transfer", async (req: Request, res: Response) => {
  const { source, destination, amount } = req.body;

  if (amount < 1) return res.status(400).send("Please check Balance");

  let sourceAccount = await User.findOne({ accountId: source });

  if (
    !sourceAccount ||
    sourceAccount.balance <= 0 ||
    sourceAccount.balance < amount
  ) {
    return res.status(400).send("Sorry somthing went wrong");
  }

  let destinationAccount = await User.findOne({ accountId: destination });

  if(!destinationAccount){
    return res.status(400).send("Sorry somthing went wrong");
  }

  if (!destinationAccount.accountId) {
    return res.status(400).send("Sorry somthing went wrong");
  }

  sourceAccount.balance = sourceAccount.balance - amount;
  destinationAccount.balance = destinationAccount.balance + amount;

  let transcriotnHistory: TransctionHistory = {
    timestamps: Date.now(),
    source,
    destination,
    amount,
    accountName:
      destinationAccount.firstname + " " + destinationAccount.lastname,
  };

  sourceAccount.histories.push(transcriotnHistory);
  destinationAccount.histories.push(transcriotnHistory);

  await sourceAccount.save();
  await destinationAccount.save();

  res.json({ sourceAccount });
});

export default router;
