import { UserVerifyStatus } from './../../constants/enums'
import { ObjectId } from 'mongodb'

// Define UserType
interface UserType {
	_id?: ObjectId
	name: string
	email: string
	day_of_birth: Date
	password: string
	email_verify_token?: string
	forgot_password_token?: string
	verify?: UserVerifyStatus
	created_at?: Date
	updated_at?: Date

	// Optional
	bio?: string
	website?: string
	location?: string
	username?: string
	avatar?: string
	cover_photo?: string
}
// Export User class
export default class User {
	_id?: ObjectId
	name: string
	email: string
	day_of_birth: Date
	password: string
	email_verify_token: string
	forgot_password_token: string
	verify: UserVerifyStatus
	created_at: Date
	updated_at: Date

	// Optional
	bio: string
	website: string
	location: string
	username: string
	avatar: string
	cover_photo: string

	constructor(user: UserType) {
		this._id = user._id
		this.name = user.name || ''
		this.email = user.email
		this.day_of_birth = user.day_of_birth || new Date()
		this.password = user.password
		this.email_verify_token = user.email_verify_token || ''
		this.forgot_password_token = user.forgot_password_token || ''
		this.verify = user.verify || UserVerifyStatus.Unverified
		this.created_at = user.created_at || new Date()
		this.updated_at = user.updated_at || this.created_at
		this.bio = user.bio || ''
		this.website = user.website || ''
		this.location = user.location || ''
		this.username = user.username || ''
		this.avatar = user.avatar || ''
		this.cover_photo = user.cover_photo || ''
	}
}
