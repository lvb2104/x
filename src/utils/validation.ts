import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { ErrorWithStatus } from '~/models/Errors'

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		// Run the validation
		await validation.run(req)
		const result = validationResult(req)

		console.log(result)

		// Check if there are any validation errors
		// const errorsObject = result.mapped()
		// for (const key in errorsObject) {
		// 	const msg = errorsObject[key].msg
		// 	if (msg instanceof ErrorWithStatus && msg)
		// }

		if (!result.isEmpty()) {
			return res.status(400).json({ errors: result.mapped() })
		}

		next()
	}
}
