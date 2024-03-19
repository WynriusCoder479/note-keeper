'use client'

import { Prisma } from '@prisma/client'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { cn, formatTimeToNow } from '@/lib/utils'
import { format } from 'date-fns'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '../ui/tooltip'
import { Button } from '@/components/ui/button'
import { Archive, ArchiveRestore, Loader2, Pin, PinOff } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { TodoPreviewItem } from './todo-preview-item'

type TodoListCardProps = {
	todoList: Prisma.TodoListGetPayload<{ include: { todos: true } }>
}

export const TodoListCard = ({ todoList }: TodoListCardProps) => {
	return (
		<Card className='relative h-fit w-[350px]'>
			<div className='absolute right-1 top-1 flex items-center gap-3 '>
				{!todoList.isArchive ? (
					<TooltipProvider>
						<Tooltip delayDuration={50}>
							<TooltipTrigger asChild>
								<Button variant='ghost'>
									{false ? (
										<Loader2 className='h-5 w-5 animate-spin' />
									) : (
										<Archive className='h-5 w-5' />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent
								className='bg-yellow-500 text-white'
								side='bottom'
							>
								<p>Archive todo list</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					<TooltipProvider>
						<Tooltip delayDuration={50}>
							<TooltipTrigger asChild>
								<Button variant='ghost'>
									{false ? (
										<Loader2 className='h-5 w-5 animate-spin' />
									) : (
										<ArchiveRestore className='h-5 w-5' />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent
								className='bg-primary text-white'
								side='bottom'
							>
								<p>Restore todo list</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				)}

				<TooltipProvider>
					<Tooltip delayDuration={50}>
						<TooltipTrigger asChild>
							<Button
								variant='ghost'
								size='sm'
							>
								{false ? (
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
						</TooltipTrigger>
						<TooltipContent
							className='bg-primary text-white'
							side='bottom'
						>
							<p>{todoList.isPin ? 'Unpin' : 'Pin'}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<CardHeader className='gap-y-2 pt-12'>
				<CardTitle className='text-3xl font-black'>{todoList.title}</CardTitle>
				<CardDescription className='flex flex-col '>
					<p>
						Created at: {format(todoList.createdAt, 'yyyy-MM-dd')} - (
						{formatTimeToNow(todoList.createdAt)})
					</p>
					<p>
						Last update: {format(todoList.updatedAt, 'yyyy-MM-dd')} - (
						{formatTimeToNow(todoList.updatedAt)})
					</p>
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
		</Card>
	)
}
