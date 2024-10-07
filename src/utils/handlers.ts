import { NextFunction, Request, RequestHandler, Response } from 'express'

// Define the wrapAsync function to handle async functions in the route handlers and middlewares
export const wrapAsync = (func: RequestHandler) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await func(req, res, next)
		} catch (error) {
			next(error)
		}
	}
}
