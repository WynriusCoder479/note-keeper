import { z } from 'zod'

export const CreateNoteSchema = z.object({
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title is required'
		})
		.min(3, { message: 'Title is at least 3 character' }),
	isPin: z.boolean()
})

export type CreateNoteSchemaType = z.infer<typeof CreateNoteSchema>
