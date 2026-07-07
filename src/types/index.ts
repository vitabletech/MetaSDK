export interface MetaClientConfig {
  /**
   * The access token used for Meta Graph API requests.
   */
  accessToken: string;
  /**
   * The Graph API version to use. Defaults to the latest stable version (e.g., 'v20.0').
   */
  version?: string;
  /**
   * Enable debug mode for verbose logging.
   */
  debug?: boolean;
}

export interface PagingCursors {
  before?: string;
  after?: string;
}

export interface Paging {
  cursors?: PagingCursors;
  next?: string;
  previous?: string;
}

export interface MetaResponse<T> {
  data: T;
  paging?: Paging;
}

export interface MetaApiErrorResponse {
  error: {
    message: string;
    type: string;
    code: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
}
