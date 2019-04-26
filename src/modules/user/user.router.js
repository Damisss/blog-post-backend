const { Router } = require('express'); 
const { signUp, login } = require('./user.controller');
const { authLocal } = require('../../services/auth.service');
const validation = require('express-validation');
const userValidation = require('./user.validation');

const routes = new Router();

routes.post('/signup', validation(userValidation), signUp); 
routes.post('/login', authLocal, login); 

module.exports = { routes }
;
