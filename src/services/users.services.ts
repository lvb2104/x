import User from '~/models/schemas/User.schemas'
import databaseServices from './database.services'

class UserService {
	async register(payload: { email: string; password: string }) {
		const { email, password } = payload
		const result = await databaseServices.users.insertOne(
			new User({
				email,
				password
			})
		)
		return result
	}
	async checkExistEmail(email: string) {
		const user = await databaseServices.users.findOne({ email })
		return Boolean(user)
	}
}

export default new UserService()
