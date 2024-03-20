'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const archiveTodoList = async (todoList: string) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unaithorize'
		}

	try {
		await db.todoList.update({
			where: {
				id: todoList
			},
			data: {
				isArchive: true,
				isPin: false
			}
		})

		revalidatePath('/todo-lists')

		return {
			type: 'success',
			data: 'Remove note successfully'
		}
	} catch (error) {
		throw error
	}
}
