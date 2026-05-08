class ApiError extends Error {
  public statusCode: number
  public data: null
  public success: boolean
  public errors: unknown[]

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: unknown[] = [],
    stack: string = ""
  ) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    this.data = null
    this.success = false
    this.errors = errors

    if (stack) {
        this.stack = stack
    } else {
        Error.captureStackTrace(this, this.constructor)
    }
  }

  // Mirrors ApiResponse's toJSON for a consistent response shape
  toJSON(): Record<string, unknown> {
    return {
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
      data: this.data,
    }
  }
}
export { ApiError }