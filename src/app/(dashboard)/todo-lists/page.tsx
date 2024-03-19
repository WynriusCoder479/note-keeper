import NoPinnedTodoList from '@/components/board/todo-list-board/no-pinned-todo-list'
import { CreateTodoListModal } from '@/components/modal/create-todo-list-modal'
import { TodoListCard } from '@/components/todo/todo-list-card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import db from '@/lib/db'
import { cn } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'

const getAllTodoLists = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const todoLists = await db.todoList.findMany({
		where: {
			userId,
			isArchive: false
		},
		include: {
			todos: true
		}
	})

	return todoLists
}

const TodoListsPage = async () => {
	const todoLists = await getAllTodoLists()

	if (todoLists.length === 0) return <NoPinnedTodoList />

	return (
		<div className='relative h-full w-full md:container'>
			<Dialog>
				<DialogTrigger asChild>
					<div
						className={cn(
							'fixed bottom-3 right-2  z-50 flex h-fit w-fit cursor-pointer items-center justify-center gap-2 rounded-md border-2 bg-background p-4 font-bold transition-all duration-150 ease-out',
							'hover:scale-105 active:scale-100'
						)}
					>
						<Plus className='h-4 w-4' />
						<p>Create List</p>
					</div>
				</DialogTrigger>
				<CreateTodoListModal />
			</Dialog>

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
export default TodoListsPage
