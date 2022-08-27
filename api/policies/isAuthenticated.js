const passport = require("passport")

module.exports = function (req, res, next) {
  return passport.authenticate('jwt', function(error, user, info) {
    if (error) return res.serverError(error);
    if (!user) return res.send('401', {message: info && info.message});
    req.user = user;

    return next();
  })(req, res)
}