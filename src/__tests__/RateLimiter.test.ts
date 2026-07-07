import { RateLimiter } from '../client/RateLimiter';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter(90); // 90% threshold
  });

  it('should parse headers and not delay if under threshold', () => {
    const headers = new Headers();
    headers.set('x-app-usage', JSON.stringify({ call_count: 50, total_time: 10 }));
    
    rateLimiter.updateLimits(headers);
    
    // @ts-ignore - access private property for testing
    expect(rateLimiter.currentUsage).toBe(50);
    // @ts-ignore
    expect(rateLimiter.delayUntil).toBe(0);
  });

  it('should set a delay if threshold is exceeded', () => {
    const headers = new Headers();
    headers.set('x-app-usage', JSON.stringify({ call_count: 95, total_time: 10 }));
    
    rateLimiter.updateLimits(headers);
    
    // @ts-ignore
    expect(rateLimiter.currentUsage).toBe(95);
    // @ts-ignore
    expect(rateLimiter.delayUntil).toBeGreaterThan(Date.now());
  });

  it('should ignore invalid JSON in headers', () => {
    const headers = new Headers();
    headers.set('x-app-usage', 'invalid json');
    
    rateLimiter.updateLimits(headers);
    
    // @ts-ignore
    expect(rateLimiter.currentUsage).toBe(0);
  });
});
