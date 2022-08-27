const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const EXPIRES_IN = 60 * 60 * 12;
const SECRET = process.env.JWT_SECRET || '90wq74b0q93b8bx3r3jegrvJI89GIbdst6wavk4RFz3e756bzxefYFOR';
const ALGORITHM = 'HS256';
const ISSUER = 'localhost';
const AUDIENCE = 'localhost';

const JWT_STRATEGY_CONFIG = {
  secretOrKey: SECRET,
  issuer: ISSUER,
  audience: AUDIENCE,
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

function _onJwtStrategyAuth(req, payload, next) {
  const token = JWT_STRATEGY_CONFIG.jwtFromRequest(req);
  let user = payload.user;
  if (!user) {
    return next(null, null, {status: 401, message: 'Invalid credentials or user'});
  }
  return next(null, user, {});
}

passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth))

module.exports.jwtSettings = {
  superAdminRole: 'admin',
  expiresIn: EXPIRES_IN,
  secret: SECRET,
  algorithm: ALGORITHM,
  issuer: ISSUER,
  audience: AUDIENCE
}