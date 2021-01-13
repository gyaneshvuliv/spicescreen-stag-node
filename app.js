var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const useragent = require('express-useragent');
const fs = require('fs');

var controllerPath = './controllers';
fs.readdirSync(controllerPath).forEach(function (file) {
  require(controllerPath + '/' + file);
});

var routes = require('./routes/index');
var app = express();



// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
// morganBody(app, { noColors: true, stream: accessLogStream });
//for serving static content
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/files'));
app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// gzip compression

// enable cors
app.use(cors());
app.options('*', cors());

//capture useragent
app.use(useragent.express());

//app.use('/', (req, res) => {
//    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED IS LISTNING' });
//});
// v1 api routes

app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT Voila' });
});
// v1 api routes
app.use('/spicescreen/advertisement', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(500).send({status:500,error: "API not found"});
});



// const db = require("./database/model");
// db.sequelize.sync();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


var date = new Date();
var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
  .toISOString()
  .split("T")[0];
const filename = path.join(__dirname, '/logs/SpiceScreen-Backend_' + dateString + '.log ');
const winston = require('winston');
//const logLevel = config.env === 'development' ? 'debug' : 'info';
const logLevel = 'development'
let winstonFormat = winston.format.combine(winston.format.json(), winston.format.colorize());
const logger = winston.createLogger({
  format: winstonFormat,
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true,
      timestamp: true
    }),
    new (winston.transports.File)({ filename: filename })
  ],
  rewritter: [(level, msg, meta) => {
    meta.applicationName = "SpiceScreen-Backend";
    meta.appVersion = "v1";
    meta.environment = logLevel;
    meta.level = logger.transports.console.level.toUpperCase();
    return meta;

  }]

});
global.logger = logger;
logger.detach = (level, msg) => {
  // logger[level](msg)
}

var http = require('http');


/**
 * Get port from environment and store in Express.
 */

global.port = normalizePort(process.env.PORT || '9638');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  console.log(error)
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}



module.exports = app;
