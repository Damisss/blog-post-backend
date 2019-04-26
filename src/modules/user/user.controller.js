const httpStatus = require('http-status');
const { User } = require('./user.model');

async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    return res.status(httpStatus.CREATED).json(user.toAuthJSON());
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).json(err);
  }
}

function login(req, res, next) {
  res.status(httpStatus.OK).json(req.user.toAuthJSON());
  return next();
}
module.exports = { signUp, login };
