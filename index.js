const http = require('http');
const app = require('./src/app');

const { PORT } = process.env;

const server = http.createServer(app);

// TODO: change console.log for a logging tool
server.on('listening', () => console.log(`server listening on port ${PORT}`));
server.on('error', error => console.error(error));

// TODO: validate port not to be in use

server.listen(PORT);
