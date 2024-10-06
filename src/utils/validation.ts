import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

// can be reused by many routes
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		// Run the validation
		await validation.run(req)
		const result = validationResult(req)

		if (!result.isEmpty()) {
			return res.status(400).json({ errors: result.mapped() })
		}

		next()
	}
}
