const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
    email: { type: string, unique: true, lowercase: true},
    name: string,
    password: string,
    picture: string,
    isSeller: { type: boolean, default: false},
    address: {
        addr1: string,
        addr2: string,
        city: string,
        state: string,
        country: string,
        country: string,
        postalCode: string
    },
    created: { type: Date, default: Date.now }
});

// encrypt password before saving
UserSchema.pre('save', function(next) {
    var user = this; // user schema

    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);

        user.password = hash;
        next();
    })
});

// compare input password with DB password
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// generates picture for each signup
UserSchema.methods.gravatar = function(size) {
    if(!this.size) size = 200;
    if(!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';

    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';
}

module.exports = mongoose.model('User', UserSchema);