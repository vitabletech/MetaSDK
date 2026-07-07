import { IHttpClient } from '../../client/HttpClient';
import { InstagramMediaService } from './InstagramMediaService';
import { InstagramCommentsService } from './InstagramCommentsService';

export class InstagramService {
  public media: InstagramMediaService;
  public comments: InstagramCommentsService;

  constructor(httpClient: IHttpClient) {
    this.media = new InstagramMediaService(httpClient);
    this.comments = new InstagramCommentsService(httpClient);
  }
}
