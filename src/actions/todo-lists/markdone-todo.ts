'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'

export const markdoneTodo = async (todoId: string, type: boolean) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unaithorize'
		}

	try {
		await db.todo.update({
			where: {
				userId,
				id: todoId
			},
			data: {
				markDone: type
			}
		})

		return {
			type: 'success',
			data: 'Markdone todo success fully'
		}
	} catch (error) {
		throw error
	}
}
