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
      .populate(['roleId', 'books'])
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
        if(bcrypt.compareSync(password, user.password)){
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

  signUp (body) {
    return new Promise((resolve, reject) => {
      return Role.findOne({where: {name: 'user'}})
        .then((role) =>{
          body.roleId = role.id;
          resolve(User.create(body).fetch());
        })
        .catch(err => reject(err));

    }); 
  }
};