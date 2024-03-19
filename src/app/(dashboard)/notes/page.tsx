import NoPinnedNote from '@/components/board/note-board/no-pinned-note'
import { CreateNoteModal } from '@/components/modal/create-note-modal'
import { NotePreviewCard } from '@/components/note/note-preview-card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import db from '@/lib/db'
import { cn } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'

const getAllNote = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const notes = await db.note.findMany({
		where: {
			userId,
			isArchive: false
		}
	})

	return notes
}

const NotesPage = async () => {
	const notes = await getAllNote()

	if (notes.length === 0) return <NoPinnedNote />

	return (
		<div className='container relative h-full w-full'>
			<Dialog>
				<DialogTrigger asChild>
					<div
						className={cn(
							'fixed bottom-3 right-2  z-50 flex h-fit w-fit cursor-pointer items-center justify-center gap-2 rounded-md border-2 bg-background p-4 font-bold transition-all duration-150 ease-out',
							'hover:scale-105 active:scale-100'
						)}
					>
						<Plus className='h-4 w-4' />
						<p>Create Note</p>
					</div>
				</DialogTrigger>
				<CreateNoteModal />
			</Dialog>

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

export default NotesPage
