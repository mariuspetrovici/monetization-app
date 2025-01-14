const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});
redisClient.connect();

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

module.exports = redisClient;
