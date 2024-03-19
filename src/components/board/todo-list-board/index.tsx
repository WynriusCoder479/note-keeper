import { TodoList } from '@prisma/client'
import NoPinnedTodoList from './no-pinned-todo-list'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

const getPinnedTodoLists = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const todoLists = await db.todoList.findMany({
		where: {
			userId,
			isPin: true
		}
	})

	return todoLists
}
const TodoListBoard = async () => {
	const todoLists = await getPinnedTodoLists()

	if (todoLists.length === 0) return <NoPinnedTodoList />

	return <div>TodoListBoard</div>
}

export default TodoListBoard
