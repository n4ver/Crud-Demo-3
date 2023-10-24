const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NODE_ENV = process.env.NODE_ENV;

const environment = {
    /* General Information */
    NODE_ENV,
    TIME_ZONE: process.env.TIME_ZONE,
    APP_PORT: process.env.APP_PORT || 8081,
    /* Database Magic */
    DB: {
        DB_NAME: process.env.DB_NAME || 'todo',
        DB_USER: process.env.DB_USER || 'root', 
        DB_PASSWORD: process.env.DB_PASS,
        OPTIONS: {
            dialect: process.env.DB_DIALECT || 'mysql',
            host: process.env.DB_HOST || 'localhost'
        },
        AUTHENTICATION: {
            jwtSecret: process.env.JWT_SECRET || 'secret'
        }
    }
};

module.exports = environment;