import { IHttpClient } from '../../client/HttpClient';
import { FacebookPostsService } from './FacebookPostsService';
import { FacebookCommentsService } from './FacebookCommentsService';

export class FacebookService {
  public posts: FacebookPostsService;
  public comments: FacebookCommentsService;

  constructor(httpClient: IHttpClient) {
    this.posts = new FacebookPostsService(httpClient);
    this.comments = new FacebookCommentsService(httpClient);
  }
}
