const httpStatus = require('http-status');
const { Post } = require('./post.models');
const { User } = require('../user/user.model');

async function CreatePost(req, res) {
  try {
    const post = await Post.create({ ...req.body, user: req.user._id });
    return res.status(httpStatus.CREATED).json(post);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error);
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('user');
    return res.status(httpStatus.OK).json(post);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error);
  }
}
async function getPosts(req, res) {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);
  try {
    const post = await Post.list({ limit, skip });
    return res.status(httpStatus.OK).json(post);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error);
  }
}
async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.user.equals(req.user._id)) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    Object.keys(req.body).forEach(elt => {
      post[elt] = req.body[elt];
    });
    return res.status(httpStatus.OK).json(await post.save());
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error);
  }
}
async function favoritePosts(req, res) {
  try {
    const user = await User.findById(req.user._id);
    await user._favorites.posts(req.params.id);
    return res.status(httpStatus.OK).json('OK');
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(error);
  }
}
module.exports = {
  CreatePost,
  getPostById,
  getPosts,
  updatePost,
  favoritePosts,
};
