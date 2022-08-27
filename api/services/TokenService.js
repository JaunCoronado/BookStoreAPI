'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  secret: sails.config.jwtSettings.secret,
  issuer: sails.config.jwtSettings.issuer,
  audience: sails.config.jwtSettings.audience,

  comparePassword: function (password, user) {
    return bcrypt.compareSync(password, user.password);
  },

  createToken: function (user) {
    return jwt.sign({
      user: user
    }, 
    sails.config.jwtSettings.secret, 
    {
      algorithm: sails.config.jwtSettings.algorithm,
      expiresIn: sails.config.jwtSettings.expiresIn,
      issuer: sails.config.jwtSettings.issuer,
      audience: sails.config.jwtSettings.audience,
    })
  },
}