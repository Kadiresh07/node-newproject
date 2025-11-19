const passport = require("../services/passport");

module.exports = (app) => {


  // 1. Send user to Google logi
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  // 2. Google redirects after login
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.send("Logged in successfully");
    }
  );


  // Profile page
app.get("/profile", (req, res) => {
  if (!req.user) return res.redirect("/auth/google");
  res.send(`
    <h1>Hello ${req.user.displayName}</h1>
    <p>Email: ${req.user.emails[0].value}</p>
    <img src="${req.user.photos[0].value}" alt="profile pic"/>
  `);
});


  // // Logout user
  // app.get('/api/logout', (req, res) => {
  //   req.logout(err => {
  //     if (err) return next(err);
  //     res.send(req.user);
  //   });
  // });

  // // Get current logged-in user
  // app.get('/api/current_user', (req, res) => {
  //   console.log(req.user);
  //   res.send(req.user);
  // });

};


// MONGO URI
// mongodb+srv://admin:root@cluster0.mqlq3vi.mongodb.net/?appName=Cluster0