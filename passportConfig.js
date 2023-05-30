import LocalStrategy from "passport-local";
import User from "./models/Users.js";

export default function initializePassport(passport) {
  passport.use(
    new LocalStrategy(function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (!user.comparePassword(password)) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      });
    })
  );
}