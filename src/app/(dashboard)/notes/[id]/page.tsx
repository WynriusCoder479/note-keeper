import db from '@/lib/db'
import { TitleBar } from './_components/title-bar'
import Editor from '@/components/editor'

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
			<div className='min-h-screen p-8'>
				<div className='mx-auto max-w-4xl'>
					<div className='w-full rounded-lg border border-foreground/10  px-4 py-8 shadow-xl backdrop-blur-xl'>
						<Editor content={note.content} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotesIdPage
