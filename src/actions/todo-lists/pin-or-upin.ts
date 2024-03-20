'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const pinOrUnpin = async (todoListId: string) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	try {
		const todoList = await db.todoList.findUnique({
			where: {
				id: todoListId
			}
		})

		if (!todoList)
			return {
				type: 'error',
				error: 'Note not found'
			}

		await db.todoList.update({
			where: {
				id: todoList.id
			},
			data: {
				isPin: !todoList.isPin
			}
		})

		revalidatePath('/todo-lists')
		revalidatePath('/')

		return {
			type: 'success'
		}
	} catch (error) {
		throw error
	}
}
