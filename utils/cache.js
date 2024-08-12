const cache = require("memory-cache");

exports.setToken = (userId, token) => {
  return new Promise((resolve, reject) => {
    try {
      // Store the token with an expiration time (7 days)
      cache.put(userId, token, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
      console.log("Token stored in memory cache");
      resolve(true);
    } catch (err) {
      console.error("Error setting token in memory cache:", err);
      reject(err);
    }
  });
};

exports.getToken = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      // Retrieve the token from the cache
      const token = cache.get(userId);
      resolve(token); // Resolve with null if token not found
    } catch (err) {
      console.error("Error getting token from memory cache:", err);
      reject(err);
    }
  });
};

exports.deleteToken = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      // Remove the token from the cache
      cache.del(userId);
      resolve(true);
    } catch (err) {
      console.error("Error deleting token from memory cache:", err);
      reject(err);
    }
  });
};
