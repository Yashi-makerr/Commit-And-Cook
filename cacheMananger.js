// utils/cacheManager.js

const cache = new Map();

/**
 * Set cache
 * @param {String} key
 * @param {*} value
 * @param {Number} ttlSeconds
 */
const setCache = (key, value, ttlSeconds = 300) => {
  const expiry = Date.now() + ttlSeconds * 1000;

  cache.set(key, {
    value,
    expiry
  });
};

/**
 * Get cache
 * @param {String} key
 */
const getCache = (key) => {
  const data = cache.get(key);

  if (!data) return null;

  if (Date.now() > data.expiry) {
    cache.delete(key);
    return null;
  }

  return data.value;
};

/**
 * Clear specific cache
 */
const clearCache = (key) => {
  cache.delete(key);
};

/**
 * Clear all cache
 */
const clearAllCache = () => {
  cache.clear();
};

module.exports = {
  setCache,
  getCache,
  clearCache,
  clearAllCache
};
