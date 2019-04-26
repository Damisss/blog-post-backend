const Joi = require('joi');

module.exports = {
  CreatePost: {
    body: {
      title: Joi.string().min(3).required(),
      blog: Joi.string().min(10).required(),
    },
  },
  updatePost: {
    body: {
      title: Joi.string().min(3),
      blog: Joi.string().min(10),
    },
  }, 
};
