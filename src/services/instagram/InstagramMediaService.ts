import { IHttpClient } from '../../client/HttpClient';
import { Paginator } from '../../pagination/Paginator';
import { MetaResponse } from '../../types';

export interface IGMedia {
  id: string;
  caption?: string;
  media_type: string;
  media_url?: string;
  permalink: string;
  timestamp: string;
}

export class InstagramMediaService {
  constructor(private httpClient: IHttpClient) {}

  /**
   * Fetches media for a given Instagram User ID.
   * @param igUserId The ID of the Instagram Business or Creator Account.
   * @param params Additional query parameters.
   */
  public async list(igUserId: string, params?: Record<string, any>): Promise<Paginator<IGMedia>> {
    const defaultParams = { fields: 'id,caption,media_type,media_url,permalink,timestamp', ...params };
    const response = await this.httpClient.get<MetaResponse<IGMedia[]>>(`/${igUserId}/media`, defaultParams);
    return new Paginator<IGMedia>(this.httpClient, response);
  }

  /**
   * Fetches a single Instagram Media object by ID.
   * @param mediaId The ID of the IG Media.
   * @param params Additional query parameters.
   */
  public async get(mediaId: string, params?: Record<string, any>): Promise<IGMedia> {
    const defaultParams = { fields: 'id,caption,media_type,media_url,permalink,timestamp', ...params };
    return this.httpClient.get<IGMedia>(`/${mediaId}`, defaultParams);
  }
}
