module.exports.cors = {
  allRoutes: true,
  allowOrigins: '*',
  allowCredentials: false,
  allowAnyOriginWithCredentialsUnsafe: true,
  allowRequestHeaders: 'content-type,accept,authorization',
  allowRequestMethods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
  allowAnyOriginWithCredentialsUnsafe: true
}