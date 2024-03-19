'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const removeNote = async (noteId: string) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unaithorize'
		}

	try {
		await db.note.delete({
			where: {
				id: noteId
			}
		})

		revalidatePath('/notes')
		revalidatePath('/')

		return {
			type: 'success',
			data: 'Remove note successfully'
		}
	} catch (error) {
		throw error
	}
}
