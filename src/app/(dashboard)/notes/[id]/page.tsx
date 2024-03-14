type NoteIdPage = {
	params: {
		id: string
	}
}

const NotesIdPage = ({ params: { id } }: NoteIdPage) => {
	return <div>Note: {id}</div>
}

export default NotesIdPage
