import { sign } from 'crypto'
import * as jwt from 'jsonwebtoken'
import { SignOptions } from 'jsonwebtoken'
import { TokenType } from '~/constants/enums'

// Define SignTokenPayload interface
interface SignTokenPayload {
	payload: string | object | Buffer
	token_type: TokenType
	privateKey?: string
	options?: SignOptions
}

// Define signToken function
export const signToken = ({
	payload,
	privateKey = process.env.JWT_SECRET as string,
	options = {
		algorithm: 'HS256'
	}
}: SignTokenPayload) => {
	// Return a promise that resolves a string token or rejects an error if any occurs during signing the token using jwt.sign method from jsonwebtoken package with the provided payload, privateKey, and options as arguments to the method call
	return new Promise<string>((resolve, reject) => {
		jwt.sign(payload, privateKey, options, (err, token) => {
			if (err) {
				reject(err)
			}
			resolve(token as string)
		})
	})
}
