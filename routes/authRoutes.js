const passport = require("passport");

module.exports = (app) => {

  // 1. Send user to Google login
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // 2. Google redirects after login
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful login
      res.redirect('/dashboard'); 
    }
  );

  // Logout user
  app.get('/api/logout', (req, res) => {
    req.logout(err => {
      if (err) return next(err);
      res.send(req.user);
    });
  });

  // Get current logged-in user
  app.get('/api/current_user', (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });

};


// MONGO URI
// mongodb+srv://admin:root@cluster0.mqlq3vi.mongodb.net/?appName=Cluster0