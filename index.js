const http = require('http');
const app = require('./src/app');
const { logger } = require('./config');

const { PORT } = process.env;

const server = http.createServer(app);

server.on('listening', () => logger.info(`server listening on port ${PORT}`));
server.on('error', error => logger.error(error));

// TODO: validate port not to be in use

server.listen(PORT);
