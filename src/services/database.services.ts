import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schemas'

// Config dotenv
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@x.ywqbe.mongodb.net/?retryWrites=true&w=majority&appName=X`

class DatabaseService {
	private client: MongoClient
	private db: Db
	constructor() {
		this.client = new MongoClient(uri)
		this.db = this.client.db(process.env.DB_NAME)
	}

	async connect() {
		try {
			// Send a ping to confirm a successful connection
			await this.db.command({ ping: 1 })
			console.log('Pinged your deployment. You successfully connected to MongoDB!')
		} finally {
			// Ensures that the client will close when you finish/error
			await this.client.close()
		}
	}

	get users(): Collection<User> {
		return this.db.collection(process.env.DB_USERS_COLLECTION as string)
	}
}

export default new DatabaseService()
