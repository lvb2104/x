import { Request, Response } from 'express'
import User from '~/models/schemas/User.schemas'
import databaseServices from '~/services/database.services'
export const loginController = (req: Request, res: Response) => {
	res.json({
		message: 'Login successfully'
	})
}

export const registerController = async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		const result = await databaseServices.users.insertOne(
			new User({
				email,
				password
			})
		)
		return res.json({
			message: 'Register successfully'
		})
	} catch (error) {
		return res.status(400).json({
			error
		})
	}
}
