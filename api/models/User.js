const bcrypt = require('bcrypt');


module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    roleId:{
      model:'role'
    },
    books: {
      collection: 'book',
      via: 'userId'
    },
    
  },

  beforeCreate: function(user, cb) {
    user.email = user.email.trim();
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          user.password = hash;
          cb();
        }
      });
    });
    
  },

};

