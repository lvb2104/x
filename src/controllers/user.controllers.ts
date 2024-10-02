import { Request, Response } from 'express'
import databaseServices from '~/services/database.services'
export const loginController = (req: Request, res: Response) => {
	res.json({
		message: 'Login successfully'
	})
}

export const registerController = (req: Request, res: Response) => {
	const { email, password } = req.body
	databaseServices.users.insertOne({
		email,
		password
	})
	return res.status(400).json({
		error: 'Login failed'
	})
}
