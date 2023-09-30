const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on('error', (err: string) => {
    console.log(`Something went wrong ${err}`);
});

export default client;