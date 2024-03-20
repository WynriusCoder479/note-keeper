'use client'

import { createBlankTodo } from '@/actions/todo-lists/create-blank-todo'
import { TodoList } from '@/components/todo/todo-list'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { formatTimeToNow } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { Loader2, Plus } from 'lucide-react'
import { ReactNode, useCallback, useTransition } from 'react'
import { Button } from '../ui/button'

type TodoDetailModalProps = {
	todoList: Prisma.TodoListGetPayload<{ include: { todos: true } }>
	children: ReactNode
}

export const TodoDetailModal = ({
	todoList,
	children
}: TodoDetailModalProps) => {
	const [isCreateBlankTodoPending, startCreateBlankTodo] = useTransition()

	const onCreateBlankTodo = useCallback(() => {
		startCreateBlankTodo(() => {
			createBlankTodo(todoList.id)
		})
	}, [todoList.id])

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader className='gap-y-2 '>
					<DialogTitle className='text-3xl font-black'>
						{todoList.title}
					</DialogTitle>
					<DialogDescription className='flex flex-col gap-2'>
						<p>
							Created at: {format(todoList.createdAt, 'yyyy-MM-dd')} - (
							{formatTimeToNow(todoList.createdAt)})
						</p>
						<p>
							Last update: {format(todoList.updatedAt, 'yyyy-MM-dd')} - (
							{formatTimeToNow(todoList.updatedAt)})
						</p>
					</DialogDescription>
				</DialogHeader>
				<div className='flex w-full flex-col items-center justify-center gap-2'>
					<TodoList todos={todoList.todos} />
					<Button
						onClick={onCreateBlankTodo}
						disabled={isCreateBlankTodoPending}
					>
						{isCreateBlankTodoPending ? (
							<Loader2 className='h-5 w-5 animate-spin' />
						) : (
							<Plus className='h-5 w-5' />
						)}

						<p className='text-lg font-semibold leading-snug'>Create todo</p>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
