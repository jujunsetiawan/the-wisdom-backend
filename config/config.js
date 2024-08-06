require('dotenv').config()

const {BASE_URL, DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOSTNAME, JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY} = process.env

module.exports = {
  "development": {
    "base_url": BASE_URL,
    "username": DB_USERNAME,
    "password": '',
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": "mysql",
    "jwtsecret": JWT_SECRET_KEY,
    "jwtRefreshSecret": JWT_REFRESH_SECRET_KEY
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOSTNAME,
    "dialect": "mysql"
  }
}
