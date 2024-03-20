'use server'

'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const updateTodoDescription = async (
	todoId: string,
	description: string
) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	try {
		const updatedTodo = await db.todo.update({
			where: {
				userId,
				id: todoId
			},
			data: {
				description
			}
		})

		revalidatePath('/todo-lists')

		return {
			type: 'success',
			data: updatedTodo
		}
	} catch (error) {
		throw error
	}
}
