let mongoose = require('mongoose');
let crypto = require('crypto');
let jwt = require('jsonwebtoken');
let env = require('env2')('.env');

let UserShema = mongoose.Schema({
    username: {type: String, unique: true},
    email: {type: String, unique:true},
    hash: String,
    salt: String,
    bio: String,
    interests: [String]
});
UserShema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(32).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
}
UserShema.methods.validatePassword = function(password){
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
    return this.hash == hash;
}
UserShema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, process.env.SECRET);
}
mongoose.model("User", UserShema);