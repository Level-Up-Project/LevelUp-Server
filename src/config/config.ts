import dotenv from 'dotenv';
dotenv.config();

const config = {
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  PORT: process.env['PORT'] || 3000,
  MONGODB_URI: process.env['MONGODB_URI'] || '',
  JWT_SECRET: process.env['JWT_SECRET'] || 'secret',
  JWT_ACCESS_EXPIRATION_MINUTES: process.env['JWT_ACCESS_EXPIRATION_MINUTES'] || 3600,
  JWT_REFRESH_EXPIRATION_DAYS: process.env['JWT_REFRESH_EXPIRATION_DAYS'] || 30,
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: process.env['JWT_RESET_PASSWORD_EXPIRATION_MINUTES'] || 60,
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: process.env['JWT_VERIFY_EMAIL_EXPIRATION_MINUTES'] || 60,
};

export default config;
