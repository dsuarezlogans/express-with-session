const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const { REDIS_URL, REDIS_PORT } = process.env;
const redisClient = redis.createClient({ host: REDIS_URL, port: REDIS_PORT });

const initRedisSession = () => session({
  secret: 'mYsEcRet',
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false
});
// TODO: change console.log for a logging tool
redisClient.on('ready', () => console.log('connected to redis'));
redisClient.on('error', err => console.error(err));

module.exports = initRedisSession;
