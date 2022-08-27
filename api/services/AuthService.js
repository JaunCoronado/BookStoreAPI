const Promise = require('bluebird');
const bcrypt = require('bcrypt');

module.exports = class AuthService {
  constructor() {
  }

  userExists(userEmail) {
    return new Promise((resolve, reject) => {
      return User.findOne({ 
        where:{
          email: userEmail
        },
      })
      .populate('roleId')
      .then((user) => {
        if (user && user.email) {
          return resolve(user);
        }
        return resolve(false);
      })
      .catch((err) => {
        return reject(err);
      })
    });
  }

  attempLogin (req, res) {
    const email = req.body.email.trim();
    const password = req.body.password;
    return this.userExists(email)
    .then((user) => {
      if (user) {
        console.log(user);
        if(bcrypt.compareSync(password, user.password)){
          console.log('token');
          const token = TokenService.createToken(user);
          delete user.password;
          user.token = token;
          return user
        }else{
          return res.send('401',{message: "Invalid User or Password"});
        }
      } else {
        return res.send('401',{message: "Invalid User or Password"});
      }
    });
  }
};