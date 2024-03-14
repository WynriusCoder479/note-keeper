import { Note } from '@prisma/client'
import NoPinnedNote from './no-pinned-note'

type NoteBoardProps = {
	notes: Note[]
}

const NoteBoard = ({ notes }: NoteBoardProps) => {
	if (notes.length === 0) return <NoPinnedNote />

	return <div>NoteBoard</div>
}

export default NoteBoard
