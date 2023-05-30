import express from "express";
import * as dotenv from "dotenv";
import User from "../models/Users.js";
import passport from "passport";
import initializingPassport, {isAuthenticated} from "../passportConfig.js";

const router = express.Router();
dotenv.config();

initializingPassport(passport);

router.route("/").get(isAuthenticated, (req, res) => {
    res.send(req.user)
})

export default router;