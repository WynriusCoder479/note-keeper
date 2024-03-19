'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

export const pinOrUnpin = async (noteId: string) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	try {
		const note = await db.note.findUnique({
			where: {
				id: noteId
			}
		})

		if (!note)
			return {
				type: 'error',
				error: 'Note not found'
			}

		await db.note.update({
			where: {
				id: noteId
			},
			data: {
				isPin: !note.isPin
			}
		})

		revalidatePath('/notes')
		revalidatePath('/')

		return {
			type: 'success'
		}
	} catch (error) {
		throw error
	}
}
