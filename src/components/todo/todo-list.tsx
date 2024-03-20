'use client'

import { TodoItemDetail } from '@/components/todo/todo-item-detail'
import { Todo } from '@prisma/client'

type TodoListProps = {
	todos: Todo[]
}

export const TodoList = ({ todos }: TodoListProps) => {
	return (
		<div className='flex h-[500px] max-h-[500px] w-full flex-col gap-2 overflow-y-auto rounded-md border-2 border-foreground/20 p-1'>
			{todos.map(todo => (
				<TodoItemDetail
					key={todo.id}
					todo={todo}
				/>
			))}
		</div>
	)
}
