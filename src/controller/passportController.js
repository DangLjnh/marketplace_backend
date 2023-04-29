import passport from "passport";
import LocalStrategy from "passport-local";
import { loginUserService } from "../services/authService";

// login
const configPassport = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const rawData = {
        username,
        password,
      };
      const res = await loginUserService(rawData);
      if (res && +res.EC === 0) {
        return done(null, res.DT);
      } else {
        return done(null, false, { message: res.EM });
      }
    })
  );
};

module.exports = { configPassport };
