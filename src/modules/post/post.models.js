const mongoose = require('mongoose');
const slug = require('slug');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    require: [true, 'title is require'],
    minlength: [3, 'title needs  to be longer'],
    trim: true,
    unique: true,
  },
  blog: {
    type: String,
    required: [true, 'description is require'],
    minlength: [10, 'description needs  to be longer'],
    trim: true,
   
  },
  slug: {
    type: String,
    trim: true,
    tolowercase: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  favoriteCount: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });
postSchema.plugin(uniqueValidator, {
  message: '{VALUE} mongoose-unique-validator',
});
postSchema.pre('validate', function (next) {
  this._slugify();
  next();
});

postSchema.methods = {
  _slugify() {
    this.slug = slug(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      slug: this.slug,
      title: this.title,
      blog: this.blog,
      createdAt: this.createdAt,
      favoriteCount: this.favoriteCount,
      user: this.user,
    };
  },
};
postSchema.statics = {
  createPost(args, user) {
    return this.create({
      ...args,
      user,
    });
  }, 
  list({ skip = 0, limit = 3 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');
  },
  incFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: 1 } });
  },
  decFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: -1 } });
  },
  // or
  // // decFavorites(postId){
  //   return this.findByIdAndUpdate(postId, {$dec:{favoriteCount: 1}})
  // }
};
const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
