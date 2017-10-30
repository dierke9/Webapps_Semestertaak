let mongoose = require('mongoose');

let UserShema = mongoose.Schema({
    "username": String,
    "email": String,
    "password": String,
    "bio": String
});

mongoose.model("User", UserShema);