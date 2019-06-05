import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const REDIS_HOST = '127.0.0.1';
const REDIS_PORT = 6379;
const options: Redis.RedisOptions = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  retryStrategy: times => Math.max(times * 100, 3000)
};
export const redis = new Redis(options);

export const pubSub = new RedisPubSub({
  publisher: redis,
  subscriber: redis
});
