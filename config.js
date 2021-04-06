const env = process.env;
require("dotenv").config();

const devConfig = {
  host: process.env.host || "freedb.tech",
  user: process.env.user || "freedbtech_emartinezfuentesCOSC",
  password: process.env.password || "Elisa123",
  database: process.env.database || "freedbtech_newschema",
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