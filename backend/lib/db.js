require("dotenv").config();
const AWS = require("aws-sdk");

const signer = new AWS.RDS.Signer();

const dbConfig = {
    host: process.env.RDS_ENDPOINT,
    user: process.env.DB_IAM_USER,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: "Amazon RDS", // Use Amazon RDS CA certificate for SSL
    },
    authPlugins: {
        mysql_clear_password: () => () =>
            signer.getAuthToken({
                region: process.env.REGION,
                hostname: process.env.RDS_ENDPOINT,
                port: process.env.DB_PORT,
                username: process.env.DB_IAM_USER,
            }),
    },
};

module.exports = dbConfig;
