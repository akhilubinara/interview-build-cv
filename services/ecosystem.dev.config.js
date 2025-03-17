const DATABASE_DEV = {

    DB_TYPE: "mysql",
    DB_HOST: "localhost",
    DB_USER: "root",
    DB_PASS: "scot",
    DB_NAME: "interview_cv_db",  
    DB_PORT: "3306",
    KNEX_DEBUG: false,

}
  
  const COMMON_DEV = {
    NODE_ENV: "development",
    FRONT_END_PORT: 3002,
    CLIENT_URL1:"http://localhost:4200",
  };
  
  module.exports = {
    apps: [
      {
        name: "CV-GENERATOR-SERVICES",
        script: "./app.js",
        watch: true,
        ignore_watch: ["Uploads"],
        cwd: "./",
        exec_mode: "cluster",
        instances: 1,
        env: {
          ...DATABASE_DEV,
          ...COMMON_DEV,
        },
        env_production: {
          //Tobe Added
        },
        log_date_format: "YYYY-MM-DD HH:mm Z",
      },
    ],
  };