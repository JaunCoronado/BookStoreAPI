module.exports.policies = {
  BookController: {
    borrowBook: ['isAuthenticated'],
    returnBook: ['isAuthenticated'],
    'delete': ['isAuthenticated', 'isAdmin'],
    'post': ['isAuthenticated', 'isAdmin'],
    'put': ['isAuthenticated', 'isAdmin'],
    'patch': ['isAuthenticated', 'isAdmin'],
  },
  AuthController: {
    checkToken: ['isAuthenticated'],
  },
  UploadController: {
    '*': ['isAuthenticated', 'isAdmin']
  }
};
