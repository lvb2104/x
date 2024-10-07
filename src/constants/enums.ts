// Define all the user verify status used in the application
export enum UserVerifyStatus {
	Unverified,
	Verified,
	Banned
}

// Define all the token types used in the application
export enum TokenType {
	AccessToken,
	RefreshToken,
	ForgotPasswordToken,
	EmailVerifyToken
}
