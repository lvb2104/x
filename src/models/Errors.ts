export class ErrorWithStatus {
	message: string
	status: number
	constructor({ message, status }: { message: string; status: number }) {
		this.status = status
		this.message = message
	}
}
