import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schemas'

// Config dotenv
config()

// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@x.ywqbe.mongodb.net/?retryWrites=true&w=majority&appName=X`

// DatabaseService class
class DatabaseService {
	private client: MongoClient
	private db: Db
	constructor() {
		this.client = new MongoClient(uri)
		this.db = this.client.db(process.env.DB_NAME)
	}

	// Connect to MongoDB
	async connect() {
		try {
			// Send a ping to confirm a successful connection
			await this.db.command({ ping: 1 })
			console.log('Pinged your deployment. You successfully connected to MongoDB!')
		} catch (error) {
			console.log('Error:', error)
			throw error
		}
	}

	// Get users method
	get users(): Collection<User> {
		return this.db.collection(process.env.DB_USERS_COLLECTION as string)
	}
}

export default new DatabaseService()
