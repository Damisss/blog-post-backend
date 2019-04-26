const Joi = require('joi');

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

module.exports = {
  signup: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordReg).required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      username: Joi.string().required(),
    },
  },
  passwordReg,
};
