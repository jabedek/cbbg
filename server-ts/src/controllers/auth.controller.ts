import { Request, Response } from "express";
import { db } from "../mongodb/models/models.index";
import { sign } from "jsonwebtoken";
import { NewUser } from "../mongodb/models/user.model";
import { secret } from "../config/auth.config";
import bcrypt from "bcryptjs";
import { Model } from "mongoose";
import logger from "node-color-log";
import { BackendMessage } from "../../../system-shared/models/backend-message";

const User: Model<NewUser> | undefined = db.user;

const signup = (req: Request, res: Response) => {
  const user = new User({
    username: (req?.body as any)?.username || "",
    password: bcrypt.hashSync((req?.body as any)?.password, 8),
    gainedPoints: req.body?.gainedPoints || 0,
    joinedAt: Date.now(),
    currentConnection: { userSocketId: "", atRoom: "" },
  });

  user.save((err: any, user: any) => {
    const result: BackendMessage = { status: "", message: "" };
    if (err) {
      result.status = "failure";
      result.message = err;
      res.status(500).send({ ...result });
      return;
    } else {
      result.status = "success";
      res.status(200).json({ ...result });
      logger.info(result);
    }
  });
};

const signin = (req: Request, res: Response) => {
  User.findOne({
    username: req.body.username,
  }).exec((err: any, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "Nie znaleziono użytkownika." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Niepoprawne hasło.",
      });
    }

    if (!err && user && passwordIsValid) {
      const token = sign({ id: user.id }, secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        accessToken: token,
      });
    }
  });
};

export const authController = {
  signup,
  signin,
};
