import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const getAllNote = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const notes = await db.note.findMany({
		where: {
			userId
		}
	})

	return notes
}

const NotesPage = async () => {
	const notes = await getAllNote()

	if (notes.length === 0) return <div>No notes</div>

	return (
		<div className='flex flex-col gap-2 p-4'>
			{notes.map(note => (
				<Link
					key={note.id}
					href={`/notes/${note.id}`}
				>
					{note.title}
				</Link>
			))}
		</div>
	)
}

export default NotesPage
