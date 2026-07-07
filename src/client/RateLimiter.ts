export interface RateLimitStatus {
  call_count: number;
  total_cputime: number;
  total_time: number;
}

export class RateLimiter {
  private currentUsage = 0;
  private delayUntil = 0;

  /**
   * Threshold percentage (0-100) at which the rate limiter should start delaying requests.
   */
  constructor(private threshold: number = 90) {}

  /**
   * Updates the internal usage metrics based on Meta API response headers.
   * @param headers Response headers from fetch
   */
  public updateLimits(headers: Headers): void {
    const appUsage = headers.get('x-app-usage');
    if (appUsage) {
      try {
        const usage: RateLimitStatus = JSON.parse(appUsage);
        // Find the maximum usage metric
        const maxUsage = Math.max(
          usage.call_count || 0,
          usage.total_cputime || 0,
          usage.total_time || 0
        );
        this.currentUsage = maxUsage;

        if (this.currentUsage >= this.threshold) {
          // If we hit threshold, introduce a backoff delay.
          // In a production app you might calculate wait time based on how close to 100% you are.
          // For simplicity, we delay by 1 minute if we're near the limit.
          this.delayUntil = Date.now() + 60 * 1000;
        } else {
          this.delayUntil = 0; // Reset if we drop below threshold
        }
      } catch {
        // Ignore JSON parse errors for usage headers
      }
    }
  }

  /**
   * Waits if the rate limit is exceeded.
   */
  public async throttle(): Promise<void> {
    const now = Date.now();
    if (this.delayUntil > now) {
      const waitTime = this.delayUntil - now;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }

  /**
   * Delays execution using exponential backoff on 429 Too Many Requests.
   * @param retryCount Current retry attempt
   */
  public async backoff(retryCount: number): Promise<void> {
    // Exponential backoff: 2^retryCount * 1000ms + jitter
    const delay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}
