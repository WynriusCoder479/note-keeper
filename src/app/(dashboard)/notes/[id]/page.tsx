import db from '@/lib/db'
import { TitleBar } from './_components/title-bar'
import Editor from './_components/editor'

type NoteIdPage = {
	params: {
		id: string
	}
}

const NotesIdPage = async ({ params: { id } }: NoteIdPage) => {
	const note = await db.note.findUnique({
		where: {
			id
		}
	})

	if (!note) return <div>No Note Found</div>

	return (
		<div className='flex h-full flex-col gap-2'>
			<TitleBar
				noteId={note.id}
				title={note.title}
			/>

			<Editor
				content={note.content}
				noteId={note.id}
			/>
		</div>
	)
}

export default NotesIdPage
