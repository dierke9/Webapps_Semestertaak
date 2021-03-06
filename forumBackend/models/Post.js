let mongoose = require('mongoose');

let PostSChema = mongoose.Schema({
    content: String,
    likes: Number,
    dislikes: Number,
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    time: Date
});

mongoose.model("Post", PostSChema);