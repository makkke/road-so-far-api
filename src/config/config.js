export default {
  env: process.env.NODE_ENV || 'production',

  // Root path of server
  root: __dirname,

  // Server port
  port: process.env.PORT || 8080,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Mongodb connection options
  mongo: {
    url: process.env.MONGO_URL || 'mongodb://admin:admin@ds145365.mlab.com:45365/road-so-far-development',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'ilovejameswoods',
  },
}
