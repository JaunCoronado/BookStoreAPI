module.exports = function (req, res, next) {
  const roles = ['admin', 'superAdmin']
  user = req.user;
  if(user){
    return Role.findOne({ 
      where:{
        id: user.roleId
      },
    })
    .then((role) => {
      console.log(role);
      if (role && roles.includes(role.name)) {
        return next();
      }
    })
    .catch((err) => {
      res.forbidden();
    })
  }
  return res.forbidden();
}