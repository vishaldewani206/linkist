
class ApiResponse<T = unknown>  {
  public statusCode: number
  public data: T
  public message: string
  public success: boolean

  constructor(statusCode: number, data: T, message: string = "Success") {
      this.statusCode = statusCode
      this.data = data
      this.message = message
      this.success = statusCode < 400
  }

  // Controls exactly what res.json() serializes — no surprises
  toJSON(): Record<string, unknown> {
      return {
          success: this.success,
          statusCode: this.statusCode,
          message: this.message,
          data: this.data,
      }
  }
}
export { ApiResponse }