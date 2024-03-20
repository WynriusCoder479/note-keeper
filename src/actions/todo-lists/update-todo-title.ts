'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const updateTodoTitle = async (todoId: string, title: string) => {
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
				title
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
