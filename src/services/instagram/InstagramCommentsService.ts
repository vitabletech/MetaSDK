import { IHttpClient } from '../../client/HttpClient';
import { Paginator } from '../../pagination/Paginator';
import { MetaResponse } from '../../types';

export interface IGComment {
  id: string;
  text: string;
  timestamp: string;
  hidden?: boolean;
  like_count?: number;
}

export class InstagramCommentsService {
  constructor(private httpClient: IHttpClient) {}

  /**
   * Fetches comments for a given Instagram Media ID.
   * @param mediaId The ID of the Instagram Media.
   * @param params Additional query parameters.
   */
  public async list(mediaId: string, params?: Record<string, any>): Promise<Paginator<IGComment>> {
    const defaultParams = { fields: 'id,text,timestamp,hidden,like_count', ...params };
    const response = await this.httpClient.get<MetaResponse<IGComment[]>>(`/${mediaId}/comments`, defaultParams);
    return new Paginator<IGComment>(this.httpClient, response);
  }

  /**
   * Fetches replies for a given Instagram Comment ID.
   * @param commentId The ID of the Instagram Comment.
   * @param params Additional query parameters.
   */
  public async listReplies(commentId: string, params?: Record<string, any>): Promise<Paginator<IGComment>> {
    const defaultParams = { fields: 'id,text,timestamp,hidden,like_count', ...params };
    const response = await this.httpClient.get<MetaResponse<IGComment[]>>(`/${commentId}/replies`, defaultParams);
    return new Paginator<IGComment>(this.httpClient, response);
  }

  /**
   * Replies to an existing comment or adds a top-level comment to an IG Media object.
   * @param objectId The ID of the IG Media or IG Comment.
   * @param message The text of the comment.
   */
  public async create(objectId: string, message: string): Promise<{ id: string }> {
    // Note: For Instagram, the endpoint is either /media-id/comments or /comment-id/replies
    // The Meta API often uses /comments for replies on FB, but IG is stricter.
    // However, for generic creation (assuming user passes correct ID and we route to /comments or /replies if needed)
    // Actually, Meta Graph API uses /replies for IG comment replies.
    // We'll expose this as a generic create for top-level, and a separate createReply for replies.
    return this.httpClient.post<{ id: string }>(`/${objectId}/comments`, {}, { message });
  }

  /**
   * Replies to an existing IG Comment.
   * @param commentId The ID of the IG Comment.
   * @param message The text of the reply.
   */
  public async createReply(commentId: string, message: string): Promise<{ id: string }> {
    return this.httpClient.post<{ id: string }>(`/${commentId}/replies`, {}, { message });
  }

  /**
   * Deletes an Instagram comment.
   * @param commentId The ID of the comment to delete.
   */
  public async delete(commentId: string): Promise<{ success: boolean }> {
    return this.httpClient.delete<{ success: boolean }>(`/${commentId}`);
  }
}
