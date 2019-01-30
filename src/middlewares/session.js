const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const { logger } = require('../../config');

const { REDIS_URL, REDIS_PORT } = process.env;
const redisClient = redis.createClient({ host: REDIS_URL, port: REDIS_PORT });

const initRedisSession = () => session({
  secret: 'mYsEcRet',
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false
});

redisClient.on('ready', () => logger.info('connected to redis'));
redisClient.on('error', err => logger.error(err));

module.exports = initRedisSession;
