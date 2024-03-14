'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash } from 'lucide-react'
import { useState } from 'react'

type AddTodoCardProps = {
	title: string
	description: string
	index: number
	onChangeTodo: (
		index: number,
		data: string,
		field: 'title' | 'description'
	) => void
	onRemoveTodo: (index: number) => void
}

export const AddTodoCard = ({
	title,
	description,
	index,
	onChangeTodo,
	onRemoveTodo
}: AddTodoCardProps) => {
	return (
		<div className='flex w-full items-center space-x-2 rounded-md bg-secondary p-1'>
			<p>{index + 1}:</p>
			<Input
				className='w-1/3'
				value={title}
				placeholder='e.g Title'
				onChange={e => onChangeTodo(index, e.currentTarget.value, 'title')}
			/>
			<p className='text-2xl'>:</p>
			<Input
				value={description}
				placeholder='e.g Descriptiom'
				onChange={e =>
					onChangeTodo(index, e.currentTarget.value, 'description')
				}
			/>
			<Button
				variant='destructive'
				size='sm'
				onClick={e => {
					e.preventDefault()
					onRemoveTodo(index)
				}}
			>
				<Trash className='h-4 w-4' />
			</Button>
		</div>
	)
}
