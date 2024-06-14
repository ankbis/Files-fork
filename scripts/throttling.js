/**
 * Rate limiting strategy
 * @param {Function} handler - The function to be rate-limited
 * @param {number} maxRequests - The maximum number of requests allowed within the time window
 * @param {number} timeWindow - The time window in milliseconds
 * @returns {Function} A new function that wraps the original handler and applies the rate limiting logic
 */
function rateLimit(handler, maxRequests, timeWindow) {
  let requestCount = 0;
  let lastResetTime = Date.now();

  return async (...args) => {
    const now = Date.now();
    if (now - lastResetTime >= timeWindow) {
      requestCount = 1;
      lastResetTime = now;
    } else if (requestCount >= maxRequests) {
      await new Promise((resolve) => setTimeout(resolve, lastResetTime + timeWindow - now));
    } else {
      requestCount++;
    }
    return handler(...args);
  };
}

/**
 * Concurrent requests limiting strategy
 * @param {Function} handler - The function to be concurrent-limited
 * @param {number} maxConcurrent - The maximum number of concurrent requests allowed
 * @returns {Function} A new function that wraps the original handler and applies the concurrent limiting logic
 */
function concurrentLimit(handler, maxConcurrent) {
  let concurrentCount = 0;
  const queue = [];

  const processQueue = async () => {
    if (concurrentCount < maxConcurrent && queue.length > 0) {
      concurrentCount++;
      const next = queue.shift();
      const result = await next();
      concurrentCount--;
      processQueue();
      return result;
    }
  };

  return async (...args) => {
    const task = async () => handler(...args);
    const result = processQueue(task);
    if (!result) {
      queue.push(task);
    }
    return result;
  };
}

/**
 * Burst limiting strategy
 * @param {Function} handler - The function to be burst-limited
 * @param {number} burstSize - The maximum number of requests allowed in the burst window
 * @param {number} burstWindow - The burst window in milliseconds
 * @param {number} cooldownPeriod - The cooldown period in milliseconds after the burst window
 * @returns {Function} A new function that wraps the original handler and applies the burst limiting logic
 */
function burstLimit(handler, burstSize, burstWindow, cooldownPeriod) {
  let requestCount = 0;
  let lastBurstTime = Date.now();

  return async (...args) => {
    const now = Date.now();
    if (now - lastBurstTime >= burstWindow + cooldownPeriod) {
      requestCount = 1;
      lastBurstTime = now;
    } else if (requestCount >= burstSize) {
      await new Promise((resolve) => setTimeout(resolve, lastBurstTime + burstWindow + cooldownPeriod - now));
    } else {
      requestCount++;
    }
    return handler(...args);
  };
}

module.exports = { rateLimit, concurrentLimit, burstLimit };
