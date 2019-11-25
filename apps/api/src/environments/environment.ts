export const environment = {
  production: false,
  app: {
    host: 'localhost',
    port: 3001,
    domain: 'http://localhost:3001'
  },
  mongo: {
    uri: 'mongodb://localhost:27017/nartc-nx'
  },
  auth: {
    secret: 'superSecret!',
    expired: '12h',
    salt: 10
  },
  swagger: {
    title: 'NestJS Auth Example',
    description: 'NestJS Auth Example API Documentation',
    version: '1.0.0',
    contact: {
      name: 'Chau Tran',
      url: 'https://nartc.netlify.com',
      email: 'ctran2428@gmail.com'
    },
    servers: []
  }
};
