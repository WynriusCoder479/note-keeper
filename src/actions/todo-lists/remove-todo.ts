'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const removeTodo = async (todoId: string) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	try {
		await db.todo.delete({
			where: {
				userId,
				id: todoId
			}
		})

		revalidatePath('/todo-lists')

		return {
			type: 'success',
			data: 'remove todo successfully'
		}
	} catch (error) {
		throw error
	}
}
