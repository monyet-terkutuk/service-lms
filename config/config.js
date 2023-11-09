require("dotenv").config();

const { DB_HOST, DB_PASSWORD, DB_NAME, DB_USERNAME } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        // other SSL options like ca, cert, key if needed
      },
    },
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        // other SSL options like ca, cert, key if needed
      },
    },
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        // other SSL options like ca, cert, key if needed
      },
    },
  },
};
