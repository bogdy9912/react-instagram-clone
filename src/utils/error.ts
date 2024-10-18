class InstaError extends Error {
  constructor(message: string, code: string, status = 0) {
    super(message);
    this.code = code;
    this.status = status;
  }

  code: string;
  status: number;

  public toString(): string {
    return `${this.message}, code: ${this.code}, status: ${this.status}`;
  }

  public toJSON() {
    return JSON.stringify(this.toObject());
  }

  static fromJSON(jsonString: string) {
    return JSON.parse(jsonString);
  }

  public toObject() {
    return {
      message: this.message,
      code: this.code,
      status: this.status,
    };
  }
}

export default InstaError;
