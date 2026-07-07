import { MetaResponse } from '../types';
import { IHttpClient } from '../client/HttpClient';

export class Paginator<T> {
  public data: T[];

  constructor(
    private httpClient: IHttpClient,
    private response: MetaResponse<T[]>
  ) {
    this.data = response.data || [];
  }

  /**
   * Controls how this object is serialized to JSON.
   * Prevents internal dependencies (like httpClient and access token) from leaking,
   * and prevents duplicating the 'data' array.
   */
  public toJSON() {
    return {
      data: this.data,
      paging: this.response.paging,
    };
  }

  /**
   * Checks if there is a next page of results.
   */
  public get hasNextPage(): boolean {
    return !!this.response.paging?.next;
  }

  /**
   * Checks if there is a previous page of results.
   */
  public get hasPreviousPage(): boolean {
    return !!this.response.paging?.previous;
  }

  /**
   * Fetches the next page of results.
   * @returns A new Paginator instance with the next page of data, or null if no more pages.
   */
  public async nextPage(): Promise<Paginator<T> | null> {
    if (!this.hasNextPage) {
      return null;
    }

    // Meta API returns full URLs for pagination links
    const nextUrl = this.response.paging!.next!;
    const nextResponse = await this.httpClient.get<MetaResponse<T[]>>(nextUrl);

    return new Paginator<T>(this.httpClient, nextResponse);
  }

  /**
   * Fetches the previous page of results.
   * @returns A new Paginator instance with the previous page of data, or null if no previous page.
   */
  public async previousPage(): Promise<Paginator<T> | null> {
    if (!this.hasPreviousPage) {
      return null;
    }

    const previousUrl = this.response.paging!.previous!;
    const previousResponse =
      await this.httpClient.get<MetaResponse<T[]>>(previousUrl);

    return new Paginator<T>(this.httpClient, previousResponse);
  }
}
