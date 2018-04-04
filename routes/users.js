var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/*
User the tutorials on these sites to understand this js file - MB

https://scotch.io/tutorials/easy-node-authentication-setup-and-local
http://www.passportjs.org/docs/username-password/

 */

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.get('/register', function(req,res){
  // take the user to the registration page here
    res.render('register');
});

router.post('/register', function(req,res){
  // validate the information sent by the user and create a new user here
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var email = req.body.email;
    var password1 = req.body.password1;
    var password2 = req.body.password2;
    console.log("password2" + password2);

    // Validation
    req.checkBody('firstname', 'First name is required').notEmpty();
    req.checkBody('lastname', 'Last name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password1', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(password1);

    var errors = req.validationErrors();

    if(errors){
        console.log(errors);
        res.render('register',{errors:errors});
        console.log(typeof errors);
    }

    else {
        User.getUserByUsername(username, function(err, user){
            if(err){
                console.log(err);
                throw err;
            }
            if(user){
                console.log("user already exists");
                var userExists = [{msg:'Sorry that username already Exists. Please choose another username.'}];
                console.log(userExists);
                res.render('register', {errors: userExists});
            }

            else{
                var newUser = new User({
                    firstName: firstname,
                    lastName: lastname,
                    username: username,
                    email: email,
                    password: password1
                });

                User.createUser(newUser, function(err, user){
                    if(err) throw err;
                    console.log(user);
                });

                console.log('success');

                res.redirect('/game');

            }
        });



    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/game', failureRedirect:'/',failureFlash: true}),
    function(req, res) {
        res.redirect('/videosPage');
});

router.get('/logout', function(req, res){
    req.logout();
    console.log('logging out');
    res.redirect('/');
});
module.exports = router;
