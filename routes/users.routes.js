import express from "express";
import * as dotenv from "dotenv";
import User from "../models/Users.js";
import passport from "passport";
import initializingPassport from "../passportConfig.js";

const router = express.Router();
dotenv.config();

initializingPassport(passport);

const users = [];

router.route("/").get((req, res) => {
  res.json(users);
});

router.route("/").post(async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "unable to create user" });
  }
});

router.route("/login").post(
  // Move passport.authenticate("local") after expressSession middleware
  passport.authenticate("local", { failureFlash: true }),
  async (req, res) => {
    res.status(200).send("Logged in");
  }
);

export default router;
