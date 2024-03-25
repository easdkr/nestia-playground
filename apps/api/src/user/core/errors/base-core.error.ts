export class BaseCoreError extends Error {
  public constructor(
    private readonly _code: string,
    message: string,
  ) {
    super(message);
  }

  public get code(): string {
    return this._code;
  }
}
