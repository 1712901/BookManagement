var express = require('express');
var router = express.Router();
var accountModel = require("../models/Account");
var hash = require('../utils/hash');
var passport = require('passport');

router.get('/login', (req,res)=>{
    if (req.isAuthenticated())
        return res.redirect('/admin');
    res.render('login', {
        message: null,
    });
});
router.post('/login',function(req, res, next) {
    passport.authenticate('local.login', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
        return res.render('login', { message: info.message })
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/admin');
      });
    })(req, res, next);
  });


router.get('/createAccount', (req,res)=>{
    res.render('signup',{
        fail: true,
        disp: "none"
    });
});

router.post('/createAccount', async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const check = await accountModel.getByUsername(username);
    if (check!=null)
        res.render('signup', {
            fail: true,
            disp: "block"
        });
    else {
    const user = {
        USERNAME: username,
        PASSWORD: hash.getHashWithSalt(password),
        EMAIL: req.body.email
    }
    const id = await accountModel.addUser(user);
    res.render('signup', {
        fail: false,
        disp: "block"
    })}
});

router.get('/signout', (req,res)=>{
    if (!req.user){
        res.redirect('/login');
    }
    else {
        req.logOut();
        res.redirect('/login');
    }
})

module.exports = router;