import express from 'express'
import usersRouter from './routes/user.routes'
import db from './services/database.services'
const app = express()
const port = 3000

// Parse
app.use(express.json())

// Connect to DB
db.connect()

app.use('/user', usersRouter)

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
