var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Article = mongoose.model('Article');
let User = mongoose.model('User');
let Post = mongoose.model('Post');
let Thread = mongoose.model('Thread');
let SubCategory = mongoose.model('SubCategory');
let Category = mongoose.model('Category');
let jwt = require('express-jwt');

let auth = jwt({ secret: process.env.SECRET, userProperty: 'payload' });

router.get('/API/articles/', function (req, res, next) {
  Article.find({}).populate('poster').exec(function (err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/articles/', function (req, res, next) {
  let article = new Article(req.body);
  article.save(function (err, rec) {
    if (err) { return next(err); }
    res.json(rec);
  });
});
router.get('/API/getAllUsers/', function (req, res, next) {
  User.find({}).exec(function (err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});
/*
router.post('/API/users/', function (req, res, next) {
  let user = new User(req.body);
  user.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
}); 
*/
router.get('/API/posts/', function (req, res, next) {
  Post.find({}).populate('poster').exec(function (err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/posts/', function (req, res, next) {
  let post = new Post(req.body);
  post.save(function (err, rec) {
    if (err) { return next(err); }
    res.json(rec);
  });
});
router.get('/API/threads/', function (req, res, next) {
  Thread.find({}).populate('posts').exec(function (err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/threads/', function (req, res, next) {
  let thread = new Thread(req.body);
  thread.save(function (err, rec) {
    if (err) { return next(err); }
    res.json(rec);
  });
});
router.get('/API/categoryDetail/', function (req, res, next) {
  var id = req.get('id');
  Category.findById(id)
    .populate({ path: 'subCats', populate: { path: "threads", options: { sort: { lastPostTime: -1 }, limit: 5 }, populate: { path: "creator" } } })
    .populate({ path: 'subCats', populate: { path: "threads", options: { sort: { lastPostTime: -1 }, limit: 5 }, populate: { path: "lastPoster" } } })
    .exec(function (err, recipes) {
      if (err) { return next(err); }
      res.json(recipes);
    });
});

router.post('/API/subcategories/', function (req, res, next) {
  let thread = new SubCategory(req.body);
  thread.save(function (err, rec) {
    if (err) { return next(err); }
    res.json(rec);
  });
});
router.get('/API/categories/', function (req, res, next) {
  Category.find({}).populate('subCats').exec(function (err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/categories/', function (req, res, next) {
  let thread = new Category(req.body);
  thread.save(function (err, rec) {
    if (err) { return next(err); }
    res.json(rec);
  });
});

router.get('/API/subCatDetail', function (req, res, next) {
  var id = req.get('id');
  SubCategory.findById(id)
    .populate({ path: 'threads', options: { sort: { lastPostTime: -1 } }, populate: { path: 'creator' } })
    .populate({ path: 'threads', options: { sort: { lastPostTime: -1 } }, populate: { path: 'lastPoster' } })
    .exec(function (err, rec) {
      if (err) { return next(err); }
      res.json(rec);
    })
});

router.get('/API/threadById', function (req, res, next) {
  var id = req.get('id');
  Thread.findById(id).populate({ path: 'posts', options: {sort: {time: 1}}, populate: { path: 'poster' } }).exec(function (err, rec) {
    if (err) { return next(err); }
    res.json(rec);
  })
})

router.post('/API/newPost',function(req,res,err){
  User.findOne({username: req.body.poster}).exec(function(next, poster){
    if(next){return next(next)}
    let post = new Post({content: req.body.content, poster: poster._id, time: Date.now()})
    post.save(function(e, saved){
      if(e){return next(e);}
      Thread.update({_id: mongoose.Types.ObjectId(req.body.threadid)},{$push:{posts:saved}, $set: {lastPostTime: Date.now(), lastPoster: poster._id}}, function(ex, newT){
        if(ex){return next(e);}
        Post.populate(saved, {path: 'poster'}, function(error, populatedPost){
          if(error){return next(error)}
          res.json(saved);          
        })
      })
    })
  })
})

module.exports = router;
