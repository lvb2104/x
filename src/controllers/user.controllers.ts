import { Request, Response } from 'express'
import UserService from '../services/users.services'

// [POST] /user/login
export const loginController = (req: Request, res: Response) => {
	res.json({
		message: 'Login successfully'
	})
}

// [POST] /user/register
export const registerController = async (req: Request, res: Response) => {
	try {
		const result = await UserService.register(req.body)
		return res.json({
			message: 'Register successfully',
			result
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			error
		})
	}
}
