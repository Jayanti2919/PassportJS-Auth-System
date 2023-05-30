import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../models/Users.js";

const router = express.Router();
dotenv.config();

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

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).send("Log in successful");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
