import { z } from 'zod'

export const TodoItemSchema = z.object({
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title is required'
		})
		.min(3, { message: 'Title at leasr 3 character' }),
	description: z.string()
})

export const CreateTodoListSchema = z.object({
	title: z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title is required'
		})
		.min(3, { message: 'Title at leasr 3 character' }),
	description: z.string(),
	isPin: z.boolean(),
	items: z.array(TodoItemSchema)
})

export const UpdateTitleTodoSchema = z.object({
	title: z.string()
})

export const UpdateDescriptionTodoSchema = z.object({
	description: z.string()
})

export type UpdateDescriptionTodoSchemaType = z.infer<
	typeof UpdateDescriptionTodoSchema
>
export type UpdateTitleTodoSchemaType = z.infer<typeof UpdateTitleTodoSchema>
export type CreateTodoListSchemaType = z.infer<typeof CreateTodoListSchema>
export type TodoItemSchemaType = z.infer<typeof TodoItemSchema>
