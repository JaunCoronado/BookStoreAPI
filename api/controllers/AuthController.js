const Promise = require('bluebird')

module.exports = {

  login: async (req, res) => {
    console.log('login');
    const AuthServiceInst = new AuthService();
    return AuthServiceInst.attempLogin(req, res)
    .then((user) => {
      return res.ok(user);
    })
    .catch((err) => {
      return res.serverError(err);
    });
  },

  signUp: async (req, res) => {
    if(req.body.password !== req.body.confirmPassword)
     return res.badRequest("The password and confirmation password do not match.");
    
    delete req.body.confirmPassword;
    const AuthServiceInst = new AuthService();
    return AuthServiceInst.signUp(req.body)
    .then((result) => {
      delete result.password
      return res.ok(result);
    })
    .catch((err) => res.serverError(err));
  },

  checkToken: async (req, res) => {
    return res.ok(req.user)
  }
};