'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'

export const getAblum = async () => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorizes'
		}

	try {
		const album = await db.album.findFirst({
			where: {
				userId
			},
			include: {
				images: true
			}
		})

		return {
			type: 'success',
			data: album
		}
	} catch (error) {
		throw error
	}
}
