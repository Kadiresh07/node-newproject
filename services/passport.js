const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();





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
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL:
        process.env.googleRedirectURI,
    },
    (accessToken, refreshToken, profile, done) => {
        console.log("Google Profile:", profile);
      done(null, profile);
  
    }
  )
);



module.exports = passport;














// const mongoose = require("mongoose");
// const keys = require("../config/keys");

// const User = mongoose.model("users");

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: "/auth/google/callback",
//       proxy: true,
//     },

//     async (accessToken, refreshToken, profile, done) => {
//       const existingUser = await User.findOne({ googleId: profile.id });

//       if (existingUser) {
//         return done(null, existingUser);
//       }

//       const user = await  new User({ googleId: profile.id }).save();

//       done(null, user);
//     }
//   )
// );
