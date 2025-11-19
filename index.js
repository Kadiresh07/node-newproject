const express = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");

const app = express();

// ----------------------
// Session + Passport setup
// ----------------------
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["mycookiekey123"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// ----------------------
// Google OAuth Strategy
// ----------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL:
        "https://villiform-unschematised-bill.ngrok-free.dev/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile);
      done(null, profile);
    }
  )
);

// ----------------------
// Routes
// ----------------------
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send("Logged in successfully");
  }
);

app.get("/", (req, res) => {
  res.send({ Hi: "kadiresh" });
});

app.listen(3000, () => console.log("Server started"));
