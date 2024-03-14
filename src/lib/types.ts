export type ResponseType<T> = {
	type: 'success' | 'error'
	error?: string | null
	data?: T
}
