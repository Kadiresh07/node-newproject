const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config(); // load .env

const app = express();

// ---------
// Session 
// ---------
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["mycookiekey123"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// // serialize/deserialize
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// ----------------------
// Google OAuth Strategy
// // ----------------------
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.googleClientID,
//       clientSecret: process.env.googleClientSecret,
//       callbackURL:
//         process.env.googleRedirectURI,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       done(null, profile);
//     }
//   )
// );

// ----------------------
// Routes
// ----------------------
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.send("Logged in successfully");
//   }
// );

require("./routes/authRoutes")(app)

app.get("/", (req, res) => {
  res.send({ Hi: "kadiresh" });
});

app.listen(3000, () => console.log("Server started"));
