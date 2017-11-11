var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Article = mongoose.model('Article');
let User = mongoose.model('User');
let Post = mongoose.model('Post');
let Thread = mongoose.model('Thread');
let SubCategory = mongoose.model('SubCategory');
let Category = mongoose.model('Category');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/API/articles/', function(req, res, next) {
  Article.find({}).populate('poster').exec(function(err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/articles/', function (req, res, next) {
  let article = new Article(req.body);
  article.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
});
router.get('/API/users/', function(req, res, next) {
  User.find({}).exec(function(err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/users/', function (req, res, next) {
  let user = new User(req.body);
  user.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
}); 
router.get('/API/posts/', function(req, res, next) {
  Post.find({}).populate('poster').exec(function(err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/posts/', function (req, res, next) {
  let post = new Post(req.body);
  post.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
}); 
router.get('/API/threads/', function(req, res, next) {
  Thread.find({}).populate('posts').exec(function(err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/threads/', function (req, res, next) {
  let thread = new Thread(req.body);
  thread.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
}); 
router.get('/API/subcategories/', function(req, res, next) {
  SubCategory.find({}).populate('threads').exec(function(err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/subcategories/', function (req, res, next) {
  let thread = new SubCategory(req.body);
  thread.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
}); 
router.get('/API/categories/', function(req, res, next) {
  Category.find({}).exec(function(err, recipes) {
    if (err) { return next(err); }
    res.json(recipes);
  });
});

router.post('/API/categories/', function (req, res, next) {
  let thread = new Category(req.body);
  thread.save(function(err, rec) {
    if (err){ return next(err); }
    res.json(rec);
  });
}); 


module.exports = router;
