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
};