import { NotePreviewCard } from '@/components/note/note-preview-card'
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

	return (
		<div className='relative h-full w-full lg:container'>
			<div className='flex flex-wrap justify-center gap-4 p-4 pt-10'>
				{notes.map(note => (
					<NotePreviewCard
						key={note.id}
						note={note}
					/>
				))}
			</div>
		</div>
	)
}

export default NoteBoard
