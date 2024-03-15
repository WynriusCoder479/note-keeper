'use server'

import db from '@/lib/db'
import { UpdateNoteTitleSchemaType } from '@/lib/schemas/note'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const updateNoteTitle = async (
	noteId: string,
	{ title }: UpdateNoteTitleSchemaType
) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	try {
		const updatedNote = await db.note.update({
			where: {
				id: noteId,
				userId
			},
			data: {
				title
			}
		})

		revalidatePath(`/notes/${noteId}`)

		return {
			type: 'success',
			data: updatedNote
		}
	} catch (error) {
		throw error
	}
}
