'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const restoreNote = async (noteId: string) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unaithorize'
		}

	try {
		await db.note.update({
			where: {
				id: noteId
			},
			data: {
				isArchive: false
			}
		})

		revalidatePath('/notes')
		revalidatePath('/archive')

		return {
			type: 'success',
			data: 'Remove note successfully'
		}
	} catch (error) {
		throw error
	}
}
