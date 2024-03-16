'use server'

import db from '@/lib/db'
import {
	UpdateNoteContentSchemaType,
	UpdateNoteContentSchema
} from '@/lib/schemas/note'
import { auth } from '@clerk/nextjs'
import { revalidateTag } from 'next/cache'

export const updateNoteContent = async (
	noteId: string,
	values: UpdateNoteContentSchemaType
) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	const validatedValues = UpdateNoteContentSchema.safeParse(values)

	if (!validatedValues.success)
		return {
			type: 'error',
			error: 'Invalid fields'
		}

	try {
		const { content } = validatedValues.data

		const updatedNote = await db.note.update({
			where: {
				id: noteId,
				userId
			},
			data: {
				content
			}
		})

		revalidateTag(`/notes/${noteId}`)

		return {
			type: 'success',
			data: updatedNote
		}
	} catch (error) {
		throw error
	}
}
