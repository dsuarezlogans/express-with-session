const moment = require('moment');
const { createLogger, transports, format } = require('winston');
const { app } = require('../src/app');

const {
  combine,
  colorize,
  label,
  printf,
  timestamp
} = format;

const logFormat = printf(info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`);

const appendTimestamp = format((info, opts) => {
  if (opts.tz) {
    info.timestamp = moment().format('YYYY-MM-DD HH:mm:ss.SSSS'); // eslint-disable-line no-param-reassign
  }
  return info;
});

const transportsSetup = {
  console: new transports.Console({
    handleExceptions: true,
    json: false,
    format: combine(
      colorize(),
      label({ label: app }),
      appendTimestamp(),
      logFormat
    ),
    colorize: true,
    level: 'debug',
  })
};

if (process.env.NODE_ENV === 'production') {
  transportsSetup.file = new transports.File({
    filename: './logs/all-logs.log',
    handleExceptions: true,
    json: true,
    format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A ZZ'
      }),
      format.json()
    ),
    maxsize: 5242880, //  5MB
    maxFiles: 5,
    colorize: false,
    level: 'error',
  });
}

const logger = createLogger({
  transports: [transportsSetup.console],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write: message => logger.info(message),
};
