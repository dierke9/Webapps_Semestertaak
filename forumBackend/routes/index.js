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
  Article.find({}).sort({ postedAt: -1 }).populate('poster').exec(function (err, recipes) {
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
  let thread = new Category({ title: req.body.category._title, description: req.body.category._description });
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
  Thread.findById(id).populate({ path: 'posts', options: { sort: { time: 1 } }, populate: { path: 'poster' } }).exec(function (err, rec) {
    if (err) { return next(err); }
    res.json(rec);
  })
})

router.post('/API/newPost', function (req, res, next) {
  User.findOne({ username: req.body.poster }).exec(function (next, poster) {
    if (next) { return next(next) }
    let post = new Post({ content: req.body.content, poster: poster._id, time: Date.now() })
    post.save(function (e, saved) {
      if (e) { return next(e); }
      Thread.update({ _id: mongoose.Types.ObjectId(req.body.threadid) }, { $push: { posts: saved }, $set: { lastPostTime: Date.now(), lastPoster: poster._id } }, function (ex, newT) {
        if (ex) { return next(e); }
        Post.populate(saved, { path: 'poster' }, function (error, populatedPost) {
          if (error) { return next(error) }
          res.json(saved);
        })
      })
    })
  })
})

router.post('/API/newCategory', function (req, res, next) {
  let thread = new Category(req.body);
  thread.save(function (err, rec) {
    if (err) { return next(err); }
    res.json(rec);
  });
})

router.post('/API/newSubCat', function (req, res, next) {
  let subcat = new SubCategory({ title: req.body.title, description: req.body.description });
  subcat.save(function (e, saved) {
    Category.update({ _id: mongoose.Types.ObjectId(req.body.categoryid) }, { $push: { subCats: saved } }, function (error, category) {
      console.log(category);
      if (error) { return next(error) }
      res.json(saved)
    })
  })
})

router.post('/API/articles/addArticle', function (req, res, next) {
  let article = new Article({ title: req.body.article._title, summary: req.body.article._summary, content: req.body.article._content, image: req.body.article._imageStirng });
  User.findOne({ username: req.body.poster }).exec(function (next, poster) {
    article.poster = poster;
    article.postedAt = Date.now();
    article.save(function (e, saved) {
      if (e) { return next(e); }
      res.json(saved);
    })
  })
})

router.get('/API/articles/articleById', function (req, res, next) {
  const id = req.get('id');
  Article.findById(id).populate('comments.poster').exec(function (err, article) {
    console.log(article);
    if (err) { return next(err); }
    res.json(article);
  })
})

router.post('/API/addThread', function (req, res, next) {
  User.findOne({ username: req.body.poster }).exec(function (e, user) {
    if (e) { return next(e); }
    const post = new Post({ time: Date.now(), content: req.body.post, poster: user._id })
    post.save(function (err, savedpost) {
      if(err){return next(err);}
      const thread = new Thread({ title: req.body.title, creator: user._id, lastPoster: user._id, lastPostTime: Date.now() });
      thread.posts.push(savedpost);
      thread.save(function(error, savedThread){
        if(error){console.log(error);}
        SubCategory.update({_id: mongoose.Types.ObjectId(req.body.subcatId)}, { $push: {threads: savedThread}}, function(subCatError, subcat){
          if(subCatError){return next(subCatError)}
          Thread.populate(savedThread, [{path: "creator"}, {path: "lastPoster"}], function(poperror, populatedThread){
            if(poperror){return next(poperror)}
            res.json(populatedThread);
          })
        })
      })
    })
  })
})

router.post('/API/articles/addComment', function(req,res,next){
  Article.findById(req.body.articleId).exec(function (e, article){
    User.findOne({username: req.body.user}).exec(function(err, user){
      const comment = {text: req.body.comment, poster: user._id};
      article.comments.push(comment);
      article.save(function(error, savedArticle){
        res.json({text: comment.text, poster: user});
      })
    })
  })
})

router.delete('/API/deletePost', function(req,res,next){
  Post.remove({_id: mongoose.Types.ObjectId(req.get('postId'))}).exec(function(err){
    if(err){return next(err)}
    Thread.update({_id: mongoose.Types.ObjectId(req.get('threadId'))}, {$pull: {posts: {_id: mongoose.Types.ObjectId(req.get('postId'))}}}).exec(function(err){
      if(err){return next(err);}
      res.json("success");
    })
  })
})

router.put('/API/editPost', function(req,res,next){
  Post.update({_id: mongoose.Types.ObjectId(req.body.post._id)}, {content: req.body.post._content}).exec(function(err, newPost){
    if(err){return next(err)}
    Post.populate(newPost, {path: "poster"},function(e, popPost){
      res.json(newPost);      
    })
  })
})

module.exports = router;
