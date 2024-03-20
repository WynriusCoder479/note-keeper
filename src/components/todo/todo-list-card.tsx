'use client'

import { archiveTodoList } from '@/actions/todo-lists/archive-todo-list'
import { pinOrUnpin } from '@/actions/todo-lists/pin-or-upin'
import { removeTodoList } from '@/actions/todo-lists/remove-todo-list'
import { restoreTodoList } from '@/actions/todo-lists/restore-todo-list'
import { TodoDetailModal } from '@/components/modal/todo-detail-modal'
import { TodoPreviewItem } from '@/components/todo/todo-preview-item'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { formatTimeToNow } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import {
	Archive,
	ArchiveRestore,
	Loader2,
	Pencil,
	Pin,
	PinOff,
	Trash
} from 'lucide-react'
import { useCallback, useTransition } from 'react'
import { toast } from 'sonner'

type TodoListCardProps = {
	todoList: Prisma.TodoListGetPayload<{ include: { todos: true } }>
}

export const TodoListCard = ({ todoList }: TodoListCardProps) => {
	const [isPinTodoListPending, startPinTodoList] = useTransition()
	const [isArchiveTodoListPending, startArchiveTodoList] = useTransition()
	const [isRestoreTodoListPending, startRestoreTodoList] = useTransition()
	const [isRemoveTodoListPending, startRemoveTodiList] = useTransition()

	const onPinOrUnpinTodo = useCallback(() => {
		startPinTodoList(async () => {
			const { type } = await pinOrUnpin(todoList.id)

			if (type === 'success') {
				toast('Has pinned/unpinned successfully', {
					description: format(Date.now(), 'yyyy-MM-dd')
				})
			}
		})
	}, [todoList.id])

	const onArchiveTodo = useCallback(() => {
		startArchiveTodoList(async () => {
			const { type } = await archiveTodoList(todoList.id)

			if (type === 'success') {
				toast('Archive todo list successfully', {
					description: format(Date.now(), 'yyyy-MM-dd')
				})
			}
		})
	}, [todoList.id])

	const onRestoreTodo = useCallback(() => {
		startRestoreTodoList(async () => {
			const { type } = await restoreTodoList(todoList.id)

			if (type === 'success') {
				toast('Restore todo list successfully', {
					description: format(Date.now(), 'yyyy-MM-dd')
				})
			}
		})
	}, [todoList.id])

	const onRemoveTodoList = useCallback(() => {
		startRemoveTodiList(async () => {
			const { type } = await removeTodoList(todoList.id)

			if (type === 'success') {
				toast('Remove todo list successfully', {
					description: format(Date.now(), 'yyyy-MM-dd')
				})
			}
		})
	}, [todoList.id])

	return (
		<Card className='relative h-fit w-[350px]'>
			<div className='absolute right-1 top-1 flex items-center gap-3 '>
				{!todoList.isArchive ? (
					<Button
						variant='ghost'
						onClick={onArchiveTodo}
						disabled={isArchiveTodoListPending}
					>
						{isArchiveTodoListPending ? (
							<Loader2 className='h-5 w-5 animate-spin' />
						) : (
							<Archive className='h-5 w-5' />
						)}
					</Button>
				) : (
					<Button
						variant='ghost'
						onClick={onRestoreTodo}
						disabled={isRestoreTodoListPending}
					>
						{false ? (
							<Loader2 className='h-5 w-5 animate-spin' />
						) : (
							<ArchiveRestore className='h-5 w-5' />
						)}
					</Button>
				)}

				<Button
					variant='ghost'
					size='sm'
					onClick={onPinOrUnpinTodo}
				>
					{isPinTodoListPending ? (
						<Loader2 className='h-5 w-5 animate-spin' />
					) : (
						<>
							{todoList.isPin ? (
								<Pin className='h-5 w-5 rotate-45' />
							) : (
								<PinOff className='h-5 w-5' />
							)}
						</>
					)}
				</Button>
			</div>
			<CardHeader className='gap-y-2 pt-12'>
				<CardTitle className='text-3xl font-black'>{todoList.title}</CardTitle>
				<CardDescription>
					{`Created at: ${format(todoList.createdAt, 'yyyy-MM-dd')} - (${formatTimeToNow(todoList.createdAt)})`}
					<p></p>
					<p></p>
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2 overflow-hidden px-2 pb-2'>
				<p className='ml-2 tracking-wider'>Todo/Task:</p>
				<div className='flex max-h-[250px] flex-col gap-2 overflow-y-auto rounded-md border border-foreground/20 p-1'>
					{todoList.todos.map(todo => (
						<TodoPreviewItem
							key={todo.id}
							todo={todo}
						/>
					))}
				</div>
			</CardContent>

			<CardFooter className='flex justify-between'>
				<Button
					variant='destructive'
					onClick={onRemoveTodoList}
					disabled={isRemoveTodoListPending}
				>
					{isRemoveTodoListPending ? (
						<Loader2 className='h-5 w-5 animate-spin' />
					) : (
						<Trash className='h-5 w-5' />
					)}
				</Button>

				{!todoList.isArchive && (
					<TodoDetailModal todoList={todoList}>
						<Button variant='default'>
							<Pencil className='h-5 w-5 text-white' />
						</Button>
					</TodoDetailModal>
				)}
			</CardFooter>
		</Card>
	)
}
