import usersRoute from "./routes/users.routes.js";
import profilesRoute from "./routes/profiles.routes.js";
import express from "express";
import expressSession from "express-session";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import passport from "passport";

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());
app.use(expressSession({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.use("/api/users", usersRoute);
app.use("/api/profiles", profilesRoute);

app.listen(8080, () => {
  console.log("Server Running!");
});
