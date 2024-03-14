'use server'

import db from '@/lib/db'
import {
	CreateTodoListSchema,
	CreateTodoListSchemaType
} from '@/lib/schemas/todo-list'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const createTodoList = async (values: CreateTodoListSchemaType) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	const validatedData = CreateTodoListSchema.safeParse(values)

	if (!validatedData.success)
		return {
			type: 'error',
			error: 'Invalidated fields'
		}
	try {
		const { title, description, isPin, items } = validatedData.data

		const todoListCreated = await db.todoList.create({
			data: {
				title,
				userId,
				isPin,
				description
			}
		})

		if (items.length > 0) {
			const dataItems = items.map(item => {
				const { title: todoTitle, description } = item

				return {
					title: todoTitle,
					description,
					isPin,
					todoListId: todoListCreated.id,
					userId
				}
			})

			await db.todo.createMany({
				data: dataItems
			})
		}

		const todoList = await db.todoList.findUnique({
			where: {
				id: todoListCreated.id
			}
		})

		revalidatePath('/')

		return {
			type: 'success',
			data: todoList
		}
	} catch (error) {
		throw error
	}
}
