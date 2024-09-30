import express from 'express'
const userRouter = express.Router()

userRouter.use(
	(req, res, next) => {
		console.log('Time: ', Date.now())
		next()
	},
	(req, res, next) => {
		console.log('Time 2: ', Date.now() + 2)
		next()
	}
)

userRouter.get('/posts', (req, res) => {
	res.json({
		data: [
			{
				id: 1,
				text: 'Hello world'
			}
		]
	})
})

export default userRouter
