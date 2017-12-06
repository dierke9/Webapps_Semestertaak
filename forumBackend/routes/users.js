var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
let User = mongoose.model('User');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function (err) {
    if (err) { return next(err); }
    return res.json({ token: user.generateJWT() });
  })
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (user) {
      return res.json({ token: user.generateJWT() })
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
})

router.post('/checkusername',function(req,res,next){
  User.find({username : req.body.username}, function(err,result){
    if(err){
      return next(err);
    }
    if(result.length){
      res.json({username : "alreadyexists"});
    }else{
      res.json({username: "OK"})
    }
  })
})

router.post("/saveSettings",function(req, res, next){
  User.findOne({username: req.body.username},function(err, user){
    console.log(user)
    if(err){return next(err)}
    user.bio = req.body.bio;
    user.birthdate= req.body.birthdate;
    user.location = req.body.location;
    user.save(function(err, result){
      res.json(result);
    })
  })
})

module.exports = router;
