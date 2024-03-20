'use client'

import { markdoneTodo } from '@/actions/todo-lists/markdone-todo'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { Todo } from '@prisma/client'
import { ChevronRight } from 'lucide-react'
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
			className={cn('flex items-start gap-2 rounded-md border p-2', {
				'border-primary': markDone && success,
				'border-foreground/20': !markDone
			})}
		>
			<div className='flex w-1/3 items-center gap-4 overflow-x-hidden'>
				<Checkbox
					checked={markDone}
					onCheckedChange={() => {
						setMarkDone(!markDone)
					}}
					className='border-foreground/20'
				/>
				<p
					className={cn('w-[130px] flex-nowrap text-nowrap ', {
						'line-through': markDone && success
					})}
				>
					{todo.title}
				</p>
			</div>
			<ChevronRight className='h-5 w-5' />
			<p className='max-h-[120px] flex-1 overflow-hidden'>{todo.description}</p>
		</div>
	)
}
