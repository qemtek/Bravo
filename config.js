module.exports = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'your_database_name',
    user: process.env.DB_USER || 'your_database_user',
    password: process.env.DB_PASSWORD || 'your_database_password',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  },
  // Add more configuration settings as needed
};
