var express = require('express');
var router = express.Router();

// require all the userModel and at last passport
const userModel = require("./users");
const passport = require("passport");

// add this two lines
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
// end of the lines



router.get('/', function(req, res, next) {
  res.render("index");
});

router.get("/login", function(req, res) {
  res.render("login");
})

router.get("/profile", isLoggedIn,function(req, res) {
  res.render("profile");
})


router.post("/register", function(req, res) {
  const userData = new userModel({
    email: req.body.email,
    username: req.body.username,
  });
  userModel.register(userData, req.body.password)
  .then(function() {
    passport.authenticate("local")(req, res, function() {
      res.redirect("/profile");
    })
  })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
}), function(req, res){

})


router.get("/logout", function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/login");
}

module.exports = router;
