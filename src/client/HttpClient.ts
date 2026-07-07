import { MetaClientConfig } from '../types';
import { MetaApiError } from '../errors/MetaApiError';
import { RateLimiter } from './RateLimiter';

export interface IHttpClient {
  get<T>(path: string, params?: Record<string, any>): Promise<T>;
  post<T>(path: string, body?: Record<string, any>, params?: Record<string, any>): Promise<T>;
  delete<T>(path: string, params?: Record<string, any>): Promise<T>;
}

export class HttpClient implements IHttpClient {
  private readonly baseUrl = 'https://graph.facebook.com';
  private rateLimiter: RateLimiter;
  private maxRetries = 3;

  constructor(private config: MetaClientConfig) {
    this.rateLimiter = new RateLimiter();
    this.config.version = this.config.version || 'v20.0';
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    params: Record<string, any> = {},
    body?: Record<string, any>,
    retryCount = 0
  ): Promise<T> {
    await this.rateLimiter.throttle();

    // If path is a full URL (like in pagination links), use it directly.
    let url: string;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      const urlObj = new URL(path);
      // Ensure access_token is injected if not already present
      if (!urlObj.searchParams.has('access_token')) {
        urlObj.searchParams.append('access_token', this.config.accessToken);
      }
      Object.entries(params).forEach(([key, val]) => {
        if (!urlObj.searchParams.has(key)) urlObj.searchParams.append(key, val);
      });
      url = urlObj.toString();
    } else {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      const queryParams = new URLSearchParams({
        access_token: this.config.accessToken,
        ...params,
      });
      url = `${this.baseUrl}/${this.config.version}${normalizedPath}?${queryParams.toString()}`;
    }
    
    if (this.config.debug) {
      console.log(`[Meta-SDK] ${method} ${url}`);
    }

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      
      // Update rate limits from headers
      this.rateLimiter.updateLimits(response.headers);

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429 && retryCount < this.maxRetries) {
          if (this.config.debug) {
            console.log(`[Meta-SDK] Rate limited on ${path}. Retrying (${retryCount + 1}/${this.maxRetries})...`);
          }
          await this.rateLimiter.backoff(retryCount);
          return this.request<T>(method, path, params, body, retryCount + 1);
        }

        const err = data.error || {};
        throw new MetaApiError(
          err.message || 'Unknown Graph API Error',
          response.status,
          err.code,
          err.type,
          err.error_subcode,
          err.fbtrace_id
        );
      }

      return data as T;
    } catch (error) {
      if (error instanceof MetaApiError) {
        throw error;
      }
      throw new Error(`Failed to execute request: ${(error as Error).message}`);
    }
  }

  public async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('GET', path, params);
  }

  public async post<T>(path: string, body?: Record<string, any>, params?: Record<string, any>): Promise<T> {
    return this.request<T>('POST', path, params, body);
  }

  public async delete<T>(path: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('DELETE', path, params);
  }
}
