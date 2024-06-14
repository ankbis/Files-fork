const { isRequestAllowed, recordRequest } = require('../scripts/throttling');

describe('Throttling Mechanism', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('allows requests below the limit', () => {
    const timestamp = Date.now();
    for (let i = 0; i < 99; i++) {
      expect(isRequestAllowed(timestamp)).toBe(true);
      recordRequest(timestamp);
    }
  });

  test('rejects requests exceeding the limit', () => {
    const timestamp = Date.now();
    for (let i = 0; i < 100; i++) {
      recordRequest(timestamp);
    }
    expect(isRequestAllowed(timestamp)).toBe(false);
  });

  test('updates the data structure correctly', () => {
    const timestamp = Date.now();
    recordRequest(timestamp);
    expect(isRequestAllowed(timestamp + 1)).toBe(true);
  });

  test('sliding window works correctly', () => {
    const timestamp = Date.now();
    for (let i = 0; i < 100; i++) {
      recordRequest(timestamp - 61000);
    }
    expect(isRequestAllowed(timestamp)).toBe(true);
  });
});
