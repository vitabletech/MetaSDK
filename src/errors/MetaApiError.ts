export class MetaApiError extends Error {
  public code: number;
  public type: string;
  public errorSubcode?: number;
  public fbtraceId?: string;
  public status: number;

  constructor(
    message: string,
    status: number,
    code: number,
    type: string,
    errorSubcode?: number,
    fbtraceId?: string
  ) {
    super(message);
    this.name = 'MetaApiError';
    this.status = status;
    this.code = code;
    this.type = type;
    this.errorSubcode = errorSubcode;
    this.fbtraceId = fbtraceId;

    // Set the prototype explicitly for extending Error in TS
    Object.setPrototypeOf(this, MetaApiError.prototype);
  }
}
