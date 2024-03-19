'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const archiveNote = async (noteId: string) => {
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
				isArchive: true
			}
		})

		revalidatePath('/notes')

		return {
			type: 'success',
			data: 'Remove note successfully'
		}
	} catch (error) {
		throw error
	}
}
