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
}
