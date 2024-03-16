'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs'

export const uploadImage = async (url: string) => {
	const { userId } = auth()

	if (!userId)
		return {
			type: 'error',
			error: 'Unauthorize'
		}

	try {
		const album = await db.album.findFirst({
			where: {
				userId
			}
		})

		if (!album) {
			const newAlbum = await db.album.create({
				data: {
					userId
				}
			})

			await db.image.create({
				data: {
					userId,
					albumId: newAlbum.id,
					url
				}
			})

			return {
				type: 'success',
				data: 'Create album and add image success fully'
			}
		}

		await db.image.create({
			data: {
				userId,
				albumId: album.id,
				url
			}
		})

		return {
			type: 'success',
			data: 'Add image successfully'
		}
	} catch (error) {
		throw error
	}
}
