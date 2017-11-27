let mongoose = require('mongoose');

let ThreadShema = mongoose.Schema({
    title: String,
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    lastPoster:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    lastPostTime: Date
});

mongoose.model("Thread", ThreadShema);