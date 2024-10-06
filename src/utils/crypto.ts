import { BinaryLike, createHash } from 'crypto'

// Hash content using sha256
function sha256(content: BinaryLike) {
	return createHash('sha256').update(content).digest('hex')
}

// Hash password using sha256
export function hashPassword(password: string) {
	return sha256(password + process.env.PASSWORD_SECRET)
}
