import { Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import { ApiError } from "../utils/ApiError"

const errorHandler = (
    err: Error | ApiError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
): void => {
    let error: ApiError

    if (err instanceof ApiError) {
        error = err
    } else {
        const statusCode =
            (err as ApiError).statusCode ||
            (err instanceof mongoose.Error ? 400 : 500)

        const message = err.message || "Something went wrong"
        const errors = (err as ApiError)?.errors || []

        error = new ApiError(statusCode, message, errors, err.stack)
    }

    const response: Record<string, unknown> = {
        success: error.success,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
        data: error.data,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
    }

    res.status(error.statusCode).json(response)
}

export { errorHandler }