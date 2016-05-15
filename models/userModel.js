var mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs");


var UserSchema = new mongoose.Schema({
    username: {type: 'String', required: true, unique: true},
    password: {type: 'String', required: true}
});


UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(7), null);
    next();
});

UserSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7), null);
};

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);