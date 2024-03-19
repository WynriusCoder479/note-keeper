import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { NotePreviewCard } from '@/components/note/note-preview-card'
import { NoStoreItem } from './no-strore-item'

const getPinnedNote = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const notes = await db.note.findMany({
		where: {
			userId,
			isArchive: true
		}
	})

	return notes
}

const NoteStore = async () => {
	const notes = await getPinnedNote()

	if (notes.length === 0) return <NoStoreItem type='note' />

	return (
		<div className='h-full w-full'>
			<div className='mx-auto flex flex-wrap justify-center gap-4 p-4 pt-10'>
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

export default NoteStore
