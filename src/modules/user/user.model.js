const mongoose = require('mongoose');
const validator = require('validator');
const userValidation = require('./user.validation');
const { hashSync, compareSync } = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');
const { Post } = require('../post/post.models');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: [true, 'Email is required!'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  firstName: {
    type: String,
    require: [true, 'firstName is required'],
    trim: true,
  },
  lastName: {
    type: String,
    require: [true, 'lastName is required'],
    trim: true,
  },
  userName: {
    type: String,
    require: [true, 'userName is required'],
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    require: [true, 'password is required!'],
    minlength: [true, 'password must be at least 6 char'],
    trim: true,
    validate: {
      validator(password) { 
        return userValidation.passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password',
    },
  },
  favorites: {
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    }],
  },
}, { timestamps: true });

userSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken ',
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    next();
  }
  return next();
});

userSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authentificateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({
      _id: this._id,
    },
    'thisIsSecret'
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      username: this.userName,
      email: this.email,
      token: `JWT ${this.createToken()}`,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      username: this.userName,
    };
  },
  _favorites: {
    async posts(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        this.favorites.posts.remove(postId);
        await Post.decFavoriteCount(postId);
      } else {
        this.favorites.posts.push(postId);
        await Post.incFavoriteCount(postId);
      }
      return this.save();
    },
  },
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
