const MAX_REQUESTS_PER_MINUTE = 100;
const REQUEST_WINDOW_MS = 60 * 1000;
const requestTimestamps = [];

function isRequestAllowed(timestamp) {
  const now = Date.now();
  const windowStart = now - REQUEST_WINDOW_MS;

  requestTimestamps = requestTimestamps.filter(t => t >= windowStart);
  requestTimestamps.push(timestamp);

  return requestTimestamps.length <= MAX_REQUESTS_PER_MINUTE;
}

function recordRequest(timestamp) {
  requestTimestamps.push(timestamp);
}

module.exports = {
  isRequestAllowed,
  recordRequest
};
