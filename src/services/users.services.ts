import { signToken } from './../utils/jwt'
import { RegisterRequestBody } from './../models/requests/User.requests'
import User from '~/models/schemas/User.schemas'
import databaseServices from './database.services'
import { hashPassword } from '~/utils/crypto'
import { TokenType } from '~/constants/enums'

// Define UserService class
class UserService {
	// Sign access token
	private async signAccessToken(user_id: string) {
		return signToken({
			payload: {
				user_id
			},
			token_type: TokenType.AccessToken,
			options: {
				expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
			}
		})
	}

	// Sign refresh token
	private async signRefreshToken(user_id: string) {
		return signToken({
			payload: {
				user_id
			},
			token_type: TokenType.RefreshToken,
			options: {
				expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
			}
		})
	}

	// Register new user
	async register(payload: RegisterRequestBody) {
		const result = await databaseServices.users.insertOne(
			new User({
				...payload,
				// convert string to Date
				day_of_birth: new Date(payload.date_of_birth),
				password: hashPassword(payload.password)
			})
		)

		// Convert ObjectId to string and store it in user_id variable for later use in signing tokens and returning the tokens to the client side after successful registration of a new user in the database collection users using the insertOne method from the databaseServices.users object with the new User instance as an argument to the method call and storing the result in the result variable for later use
		const user_id = result.insertedId.toHexString()

		// Sign access token and refresh token simultaneously
		const [access_token, refresh_token] = await Promise.all([
			this.signAccessToken(user_id),
			this.signRefreshToken(user_id)
		])

		// Return access token and refresh token
		return {
			access_token,
			refresh_token
		}
	}

	// Check if email already exists
	async checkExistEmail(email: string) {
		const user = await databaseServices.users.findOne({ email })
		return Boolean(user)
	}
}

// Export instance of UserService
export default new UserService()
