import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { NoStoreItem } from './no-strore-item'

const getPinnedNote = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const todoLists = await db.todoList.findMany({
		where: {
			userId,
			isArchive: true
		}
	})

	return todoLists
}

const TodoListStore = async () => {
	const todoLists = await getPinnedNote()

	if (todoLists.length === 0) return <NoStoreItem type='todo list' />

	return <div className='h-full w-full'>Todo</div>
}

export default TodoListStore
