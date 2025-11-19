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
  // 3. Get logged-in user info
  app.get("/api/current_user", (req, res) => {
    res.send(req.user); // this works if user is logged in
  });

  // 4. Logout
  app.get("/api/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
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