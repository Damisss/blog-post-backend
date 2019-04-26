const { Router } = require('express');
const { jwToken } = require('../../services/auth.service');
const { CreatePost, getPostById, getPosts, updatePost, favoritePosts } = require('./post.controlleur');
const validator = require('express-validation');
const valid = require('./post.validation');

const postRoutes = new Router();

postRoutes.post('/', jwToken, validator(valid), CreatePost);

postRoutes.get('/:id', getPostById);

postRoutes.get('/', getPosts);
postRoutes.patch('/:id', jwToken, validator(valid.updatePost), updatePost);
postRoutes.post('/:id/favorite', jwToken, favoritePosts);

module.exports = { postRoutes };
