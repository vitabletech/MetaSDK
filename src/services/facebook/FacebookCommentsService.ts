import { IHttpClient } from '../../client/HttpClient';
import { Paginator } from '../../pagination/Paginator';
import { MetaResponse } from '../../types';

export interface Comment {
  id: string;
  message: string;
  created_time: string;
  from?: {
    id: string;
    name: string;
  };
}

export class FacebookCommentsService {
  constructor(private httpClient: IHttpClient) {}

  /**
   * Fetches comments for a given post or object ID.
   * @param objectId The ID of the post, photo, or video.
   * @param params Additional query parameters (e.g., limit, order)
   */
  public async list(objectId: string, params?: Record<string, any>): Promise<Paginator<Comment>> {
    const response = await this.httpClient.get<MetaResponse<Comment[]>>(`/${objectId}/comments`, params);
    return new Paginator<Comment>(this.httpClient, response);
  }

  /**
   * Replies to an existing comment or adds a top-level comment to an object.
   * @param objectId The ID of the post or the comment being replied to.
   * @param message The text of the comment.
   */
  public async create(objectId: string, message: string): Promise<{ id: string }> {
    return this.httpClient.post<{ id: string }>(`/${objectId}/comments`, {}, { message });
  }

  /**
   * Deletes a comment.
   * @param commentId The ID of the comment to delete.
   */
  public async delete(commentId: string): Promise<{ success: boolean }> {
    return this.httpClient.delete<{ success: boolean }>(`/${commentId}`);
  }
}
