const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Token = require('../models/token');

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true, trim: true },
    username: { type: String, unique: true, required: false, },
    password: { type: String, required: true, max: 100 },
    firstName: { type: String, required: false, max: 100 },
    lastName: { type: String, required: false, max: 100 },
    bio: { type: String, required: false, max: 255 },
    profileImage: { type: String, required: false, max: 255 },
    phone: { type: Number, required: false },
    user_type: { type: String, required: false, default: 'user' },
    is_seller: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false }
}, {timestamps: true});


UserSchema.pre('save',  function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        username: this.username,
        user_type: this.user_type,
        is_seller: this.is_seller,
        is_admin: this.is_admin,
        firstName: this.firstName,
        lastName: this.lastName,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

UserSchema.methods.generateVerificationToken = function() {
    let payload = {
        userId: this._id,
        token: crypto.randomBytes(20).toString('hex')
    };

    return new Token(payload);
};

module.exports = mongoose.model('Users', UserSchema);