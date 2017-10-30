let mongoose = require('mongoose');

let ThreadShema = mongoose.Schema({
    "title": String,
    "posts":[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

mongoose.model("Thread", ThreadShema);