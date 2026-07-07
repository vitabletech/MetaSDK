import { IHttpClient } from '../../client/HttpClient';
import { Paginator } from '../../pagination/Paginator';
import { MetaResponse } from '../../types';

export interface Post {
  id: string;
  message?: string;
  created_time: string;
  story?: string;
  full_picture?: string;
}

export class FacebookPostsService {
  constructor(private httpClient: IHttpClient) {}

  /**
   * Fetches posts for a given Facebook Page or User.
   * @param pageId The ID of the Facebook Page or User.
   * @param params Additional query parameters.
   */
  public async list(pageId: string, params?: Record<string, any>): Promise<Paginator<Post>> {
    // Usually fields need to be specified to get non-default fields.
    const defaultParams = { fields: 'id,message,created_time,story,full_picture', ...params };
    const response = await this.httpClient.get<MetaResponse<Post[]>>(`/${pageId}/posts`, defaultParams);
    return new Paginator<Post>(this.httpClient, response);
  }

  /**
   * Fetches a single post by ID.
   * @param postId The ID of the post.
   * @param params Additional query parameters.
   */
  public async get(postId: string, params?: Record<string, any>): Promise<Post> {
    const defaultParams = { fields: 'id,message,created_time,story,full_picture', ...params };
    return this.httpClient.get<Post>(`/${postId}`, defaultParams);
  }
}
