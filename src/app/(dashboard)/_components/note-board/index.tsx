import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import NoPinnedNote from './no-pinned-note'

const getPinnedNote = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const notes = await db.note.findMany({
		where: {
			userId,
			isPin: true
		}
	})

	return notes
}

const NoteBoard = async () => {
	const notes = await getPinnedNote()

	if (notes.length === 0) return <NoPinnedNote />

	return <div>NoteBoard</div>
}

export default NoteBoard
