let mongoose = require('mongoose');

let SubCatShema = mongoose.Schema({
    title: String,
    description: String,
    threads: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread"
    }]
});

mongoose.model("SubCategory", SubCatShema);