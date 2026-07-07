import { Paginator } from '../pagination/Paginator';
import { IHttpClient } from '../client/HttpClient';
import { MetaResponse } from '../types';

describe('Paginator', () => {
  let mockHttpClient: jest.Mocked<IHttpClient>;

  beforeEach(() => {
    mockHttpClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    };
  });

  it('should initialize with data and correctly identify hasNextPage', () => {
    const response: MetaResponse<any[]> = {
      data: [{ id: '1' }, { id: '2' }],
      paging: {
        next: 'https://graph.facebook.com/v20.0/me/posts?after=cursor123',
      },
    };

    const paginator = new Paginator(mockHttpClient, response);

    expect(paginator.data.length).toBe(2);
    expect(paginator.hasNextPage).toBe(true);
    expect(paginator.hasPreviousPage).toBe(false);
  });

  it('should fetch the next page correctly', async () => {
    const response: MetaResponse<any[]> = {
      data: [{ id: '1' }],
      paging: {
        next: 'https://graph.facebook.com/v20.0/me/posts?after=cursor123',
      },
    };
    const paginator = new Paginator(mockHttpClient, response);

    const nextResponse: MetaResponse<any[]> = {
      data: [{ id: '2' }],
    };
    mockHttpClient.get.mockResolvedValueOnce(nextResponse);

    const nextPage = await paginator.nextPage();

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      'https://graph.facebook.com/v20.0/me/posts?after=cursor123'
    );
    expect(nextPage).not.toBeNull();
    expect(nextPage!.data[0].id).toBe('2');
    expect(nextPage!.hasNextPage).toBe(false);
  });
});
