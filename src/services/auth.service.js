const passport = require('passport');
const localStrategy = require('passport-local');
const { User } = require('../modules/user/user.model');
const JWTStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
// const config = require('../config/dataBase');

const localOpts = {
  usernameField: 'email',
};

const localstrategy = new localStrategy(localOpts, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (!user.authentificateUser(password)) {
      return done(null, false);
    }
    return done(null, user); 
  } catch (error) {
    return done(error, false);
  }
});

const jwtOps = {
  secretOrKey: 'thisIsSecret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
};
const jwtStrategy = new JWTStrategy(jwtOps, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});
passport.use(localstrategy);
passport.use(jwtStrategy);
const authLocal = passport.authenticate('local', { session: false });
const jwToken = passport.authenticate('jwt', { session: false });
module.exports = { authLocal, jwToken };
