let mongoose = require('mongoose');

let ArticleShema = new mongoose.Schema({
    image: String,
    title: String,
    summary: String,
    content: String,
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        text: String,
        poster: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }]
});

mongoose.model('Article', ArticleShema);