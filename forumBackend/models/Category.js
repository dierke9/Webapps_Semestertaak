let mongoose = require('mongoose');

let CategoryShema = mongoose.Schema({
    "title": String,
    "description": String,
    "subCats": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    }]
});

mongoose.model("Category", CategoryShema);