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

export const UpdateNoteTitleSchema = z.object({
	title: z.string({
		required_error: 'Title is required',
		invalid_type_error: 'Title is required'
	})
})

export type UpdateNoteTitleSchemaType = z.infer<typeof UpdateNoteTitleSchema>

export const UpdateNoteContentSchema = z.object({
	content: z.string()
})

export type UpdateNoteContentSchemaType = z.infer<
	typeof UpdateNoteContentSchema
>
