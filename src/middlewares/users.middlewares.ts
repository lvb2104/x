import { validate } from '~/utils/validation'
import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import usersServices from '~/services/users.services'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res.status(400).json({
			error: 'Missing email or password'
		})
	}
	next()
}

export const registerValidator = validate(
	checkSchema({
		name: { isLength: { options: { min: 1, max: 100 } }, notEmpty: true, trim: true, isString: true },
		email: {
			notEmpty: true,
			isEmail: true,
			trim: true,
			custom: {
				options: async (value) => {
					const isExistEmail = await usersServices.checkExistEmail(value)
					if (isExistEmail) {
						throw new Error('Email already exists')
					}
					return value
				}
			}
		},
		password: {
			notEmpty: true,
			isStrongPassword: {
				options: {
					minLength: 8,
					minLowercase: 1,
					minUppercase: 1,
					minNumbers: 1,
					minSymbols: 1
				},
				errorMessage:
					'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
			},
			custom: {
				options: (value, { req }) => {
					if (value !== req.body.confirm_password) {
						throw new Error('Password confirmation does not match password')
					}
					return value
				}
			}
		},
		confirm_password: {
			notEmpty: true,
			isStrongPassword: {
				options: {
					minLength: 8,
					minLowercase: 1,
					minUppercase: 1,
					minNumbers: 1,
					minSymbols: 1
				},
				errorMessage:
					'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
			}
		},
		day_of_birth: { isISO8601: { options: { strict: true, strictSeparator: true } } }
	})
)
