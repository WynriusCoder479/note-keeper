'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const createBlankTodo = async (todoListId: string) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	try {
		const newBlankTodo = await db.todo.create({
			data: {
				userId,
				title: 'New Title',
				description: 'New Description',
				todoListId
			}
		})

		revalidatePath('/todo-lists')

		return {
			type: 'success',
			data: newBlankTodo
		}
	} catch (error) {
		throw error
	}
}
