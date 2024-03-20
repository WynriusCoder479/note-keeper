import db from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { TodoListCard } from '@/components/todo/todo-list-card'
import { NoStoreItem } from '@/components/archive/no-strore-item'

const getPinnedNote = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const todoLists = await db.todoList.findMany({
		where: {
			userId,
			isArchive: true
		},
		include: {
			todos: true
		}
	})

	return todoLists
}

const TodoListStore = async () => {
	const todoLists = await getPinnedNote()

	if (todoLists.length === 0) return <NoStoreItem type='todo list' />

	return (
		<div className='h-full w-full'>
			<div className='mx-auto flex flex-wrap justify-center gap-4 p-4 pt-10'>
				{todoLists.map(todoList => (
					<TodoListCard
						key={todoList.id}
						todoList={todoList}
					/>
				))}
			</div>
		</div>
	)
}

export default TodoListStore
