module.exports = {
  HOST: "3.7.31.207",
  USER: "root",
  PASSWORD: "RBI@M0ve@1980",
  DB: "spicescreen_web",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};