'use client'

import { markdoneTodo } from '@/actions/todo-lists/markdone-todo'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Todo } from '@prisma/client'
import { useEffect, useState } from 'react'

type TodoPreviewItemProps = {
	todo: Todo
}

export const TodoPreviewItem = ({ todo }: TodoPreviewItemProps) => {
	const [markDone, setMarkDone] = useState(todo.markDone)
	const [success, setSuccess] = useState(todo.markDone)

	useEffect(() => {
		markdoneTodo(todo.id, markDone).then(data => {
			if (data.type === 'success') {
				setSuccess(true)
			}
		})
	}, [markDone, todo.id])

	return (
		<div
			key={todo.id}
			className={cn('flex items-center gap-2 rounded-md border p-2', {
				'border-primary': markDone && success,
				'border-foreground/20': !markDone
			})}
		>
			<Checkbox
				checked={markDone}
				onCheckedChange={() => {
					setMarkDone(!markDone)
				}}
				className='border-foreground/20'
			/>
			<p
				className={cn('w-[130px] text-lg ', {
					'line-through': markDone && success
				})}
			>
				{todo.title}
			</p>
			<p className='opacity-70'>|</p>
			<p className='line-clamp-1'>{todo.description}</p>
		</div>
	)
}
