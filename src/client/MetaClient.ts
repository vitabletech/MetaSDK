import { MetaClientConfig } from '../types';
import { HttpClient, IHttpClient } from './HttpClient';
import { FacebookService } from '../services/facebook/FacebookService';
import { InstagramService } from '../services/instagram/InstagramService';

export class MetaClient {
  private httpClient: IHttpClient;

  public facebook: FacebookService;
  public instagram: InstagramService;

  constructor(config: MetaClientConfig) {
    if (!config.accessToken) {
      throw new Error('MetaClient requires an accessToken');
    }

    this.httpClient = new HttpClient(config);
    this.facebook = new FacebookService(this.httpClient);
    this.instagram = new InstagramService(this.httpClient);
  }

  /**
   * Make a generic GET request to any Graph API endpoint.
   * @param path The endpoint path (e.g., '/me')
   * @param params Query parameters
   */
  public async get<T = any>(
    path: string,
    params?: Record<string, any>
  ): Promise<T> {
    return this.httpClient.get<T>(path, params);
  }

  /**
   * Make a generic POST request to any Graph API endpoint.
   * @param path The endpoint path
   * @param body The request body
   * @param params Query parameters
   */
  public async post<T = any>(
    path: string,
    body?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<T> {
    return this.httpClient.post<T>(path, body, params);
  }

  /**
   * Make a generic PUT request to any Graph API endpoint.
   * @param path The endpoint path
   * @param body The request body
   * @param params Query parameters
   */
  public async put<T = any>(
    path: string,
    body?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<T> {
    return this.httpClient.put<T>(path, body, params);
  }

  /**
   * Make a generic PATCH request to any Graph API endpoint.
   * @param path The endpoint path
   * @param body The request body
   * @param params Query parameters
   */
  public async patch<T = any>(
    path: string,
    body?: Record<string, any>,
    params?: Record<string, any>
  ): Promise<T> {
    return this.httpClient.patch<T>(path, body, params);
  }

  /**
   * Make a generic DELETE request to any Graph API endpoint.
   * @param path The endpoint path
   * @param params Query parameters
   */
  public async delete<T = any>(
    path: string,
    params?: Record<string, any>
  ): Promise<T> {
    return this.httpClient.delete<T>(path, params);
  }
}
