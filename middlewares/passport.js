var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var db = require('../utils/db');
var run = db.errorhandle;
var accountModel = require('../models/Account');
var hash = require('../utils/hash');

passport.serializeUser(function(user, done) {
    done(null, user.IDADMIN);
});

passport.deserializeUser(async (id, done) => {
    const [user,err] = await run(accountModel.getById(id));
    done(err,user);
});

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true},
    async (req, username,password,done) => {
        const [user,err] = await run(accountModel.getByUsername(username));
        if (err) {
            return done(err);
        }
        if (user === null){
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (!hash.comparePassword(password, user.PASSWORD)) {
            return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
    }
));
