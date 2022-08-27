module.exports.policies = {
  BookController: {
    '*': ['isAuthenticated', 'isAdmin']
  },
  UploadController: {
    '*': ['isAuthenticated', 'isAdmin']
  }
};
