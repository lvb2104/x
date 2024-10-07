import { Request, Response } from 'express'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import UserService from '../services/users.services'
import { RegisterRequestBody } from '~/models/requests/User.requests'

// [POST] /user/login
// Define the controller for the login route
export const loginController = (req: Request, res: Response) => {
	res.json({
		message: 'Login successfully'
	})
}

// [POST] /user/register
// Define the controller for the register route
export const registerController = async (
	req: Request<ParamsDictionary, any, RegisterRequestBody>,
	res: Response,
	next: NextFunction
) => {
	const result = await UserService.register(req.body)
	return res.json({
		message: 'Register successfully',
		result
	})
}
