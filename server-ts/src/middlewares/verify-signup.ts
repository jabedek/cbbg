import { Request, Response, NextFunction } from "express";
import { db } from "../mongodb/models/models.index";

const User = db.user;

export const checkDuplicateUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Username

  User?.findOne({
    username: (req?.body as any)?.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    } else {
      next();
    }
  });
};

export const verifySignup = {
  checkDuplicateUsername,
};
