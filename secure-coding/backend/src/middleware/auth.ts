import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config";
import { BadRequest } from "../errors";

const jwt = require("jsonwebtoken");

export const jwtVerify = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization.replace("Bearer ", "");

  if (!token) res.status(400).send("Invalid token !");

  try {
    const data = jwt.verify(token, JWT_SECRET);

    if (!data) res.status(400).send("Invalid token !");

    next();
  } catch {
    res.status(400).send("Invalid token !");
  }
};
