const env = process.env;
require("dotenv").config();

const devConfig = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
}

const proConfig = {
  connectionString: process.env.DATABASE_URL   // heroku addons
}

const config = {
  db: devConfig
  ,
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;