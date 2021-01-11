const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //operatorsAliases: false,
    logging: false,
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: 'Etc/GMT0',
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.authenticate().then((result) => {
    let logEntry = {
        operationName: "database.model",
        startTime: new Date(),
    }
    logEntry.message = "SpiceScreen DB connection Successfull!!"
    logger.detach("info", logEntry);
}).catch(err => { console.log(err) })

module.exports = db;