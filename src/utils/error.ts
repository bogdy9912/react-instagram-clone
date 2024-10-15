class InstaError extends Error {
  constructor(message: string, code: string, status = 0) {
    super(message);
    this.code = code;
    this.status = status;
  }

  code: string;
  status: number;
}

export default InstaError;
