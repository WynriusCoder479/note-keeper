'use server'

import db from '@/lib/db'
import { CreateNoteSchema, CreateNoteSchemaType } from '@/lib/schemas/note'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const createNote = async (values: CreateNoteSchemaType) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	const validatedData = CreateNoteSchema.safeParse(values)

	if (!validatedData.success)
		return {
			type: 'error',
			error: 'Invalidated fields'
		}
	try {
		const { title, isPin } = validatedData.data

		const note = await db.note.create({
			data: {
				title,
				userId,
				content: '',
				isPin
			}
		})

		revalidatePath('/')

		return {
			type: 'success',
			data: note
		}
	} catch (error) {
		throw error
	}
}
