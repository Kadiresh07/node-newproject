const passport = require('passport')


module.exports = (app) => {

app.get('/auth/google',passport.authenticate('google',{
  scope: ['profile','email']
}))


   app.get(
  "/auth/google/callback",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get('/api/logout', (req,res)=>{
  req.logout();
  res.send(req.user);
})

app.get('/api/current_user',(req,res)=>{
  console.log(req.user);
  res.send(req.user)
})

}

// MONGO URI
// mongodb+srv://admin:root@cluster0.mqlq3vi.mongodb.net/?appName=Cluster0