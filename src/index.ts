import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/user.routes'
import db from './services/database.services'
const app = express()
const port = 3000

// Parse
app.use(express.json())

// Connect to DB
db.connect()

// [GET] /users
app.use('/users', usersRouter)

// Error handler middleware for validation errors in the routes handlers and middlewares
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
	res.status(400).json({
		error: error.message
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
