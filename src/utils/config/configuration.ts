export default () => ({
  ports: {
    main: parseInt(process.env.PORT) || 3000,
    socket: 3005,
  },
  database: {
    main: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  },
  mail: {
    sengrid: {
      email: process.env.FROM_EMAIL,
      key: process.env.SENDGRID_SECRET_KEY,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  jwt: {
    expiry: parseInt(process.env.JWT_EXPIRY),
    secret: process.env.JWT_SECRET,
  },
  seed: {
    user: {
      admin: process.env.EMAIL_FOR_ADMIN,
      user: process.env.EMAIL_FOR_USER,
    },
  },
});
