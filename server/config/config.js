require('dotenv').config();
console.log("CFG Loaded")

module.exports = {
  "development": {
    "username": process.env.DB_USER || 'complaintbase',
    "password": process.env.DB_PASS || 'c0mplaintBa$e',
    "database": process.env.DB_NAME || 'todo',
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER || 'root',
    "password": process.env.DB_PASS || '',
    "database": process.env.DB_NAME || 'todo',
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DB_USER || 'root',
    "password": process.env.DB_PASS || '',
    "database": process.env.DB_NAME || 'todo',
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
