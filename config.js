const dotenv = require('dotenv');
const path = require('path');
const root = path.join.bind(this, __dirname);

dotenv.config({ path: root('.env') });

module.exports = {
    PORT: process.env.PORT,
    MONGOURL: process.env.MONGOURL,
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    SESSION_SECRET: process.env.SESSION_SECRET,
    DESTINATION: process.env.UPLOAD_FOLDER
}