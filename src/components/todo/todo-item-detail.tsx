'use client'

import { markdoneTodo } from '@/actions/todo-lists/markdone-todo'
import { removeTodo } from '@/actions/todo-lists/remove-todo'
import { updateTodoDescription } from '@/actions/todo-lists/update-todo-description'
import { updateTodoTitle } from '@/actions/todo-lists/update-todo-title'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	UpdateDescriptionTodoSchema,
	UpdateDescriptionTodoSchemaType,
	UpdateTitleTodoSchema,
	UpdateTitleTodoSchemaType
} from '@/lib/schemas/todo-list'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Todo } from '@prisma/client'
import { ChevronRight, Loader2, Save, Trash } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '../ui/form'
import { FormInput } from '../ui/form-input'
import { FormTextarea } from '../ui/form-textarea'

type TodoItemDetailProps = {
	todo: Todo
}

export const TodoItemDetail = ({ todo }: TodoItemDetailProps) => {
	const [markDone, setMarkDone] = useState<boolean>(todo.markDone)

	const [todoTitle, setTodoTile] = useState<string>(todo.title)
	const [isEditTitle, setIsEditTitle] = useState<boolean>(false)
	const formInputTitleRef = useRef<HTMLInputElement>(null)
	const [isChangeTitlePending, startChangeTitle] = useTransition()

	const [todoDescription, setTodoDescription] = useState<string>(
		todo.description
	)
	const [isEditDescription, setIsEditDescription] = useState<boolean>(false)
	const formInputDescriptionRef = useRef<HTMLTextAreaElement>(null)
	const [isChangeDescriptionPending, startChangeDescription] = useTransition()

	const [isRemoveTodoPending, startRemoveTodo] = useTransition()

	const onRemoveTodo = useCallback(() => {
		startRemoveTodo(() => {
			removeTodo(todo.id)
		})
	}, [todo.id])

	useEffect(() => {
		formInputTitleRef.current?.focus()
	}, [isEditTitle])

	useEffect(() => {
		formInputDescriptionRef.current?.focus()
	}, [isEditDescription])

	useEffect(() => {
		markdoneTodo(todo.id, markDone)
	}, [markDone, todo.id])

	const changeTitleForm = useForm<UpdateTitleTodoSchemaType>({
		resolver: zodResolver(UpdateTitleTodoSchema),
		defaultValues: {
			title: todoTitle
		}
	})

	const changeDescriptionForm = useForm<UpdateDescriptionTodoSchemaType>({
		resolver: zodResolver(UpdateDescriptionTodoSchema),
		defaultValues: {
			description: todoDescription
		}
	})

	const onChangeTitle = (values: UpdateTitleTodoSchemaType) => {
		startChangeTitle(() => {
			updateTodoTitle(todo.id, values.title).then(data => {
				const { type, data: updatedTodoTitle } = data

				if (type === 'success') {
					setTodoTile(updatedTodoTitle!.title)
				}

				setIsEditTitle(false)
			})
		})
	}

	const onChangeDescription = (values: UpdateDescriptionTodoSchemaType) => {
		startChangeDescription(() => {
			updateTodoDescription(todo.id, values.description).then(data => {
				const { type, data: updatedTodoDescription } = data

				if (type === 'success') {
					console.log(updatedTodoDescription)
					setTodoDescription(updatedTodoDescription!.description)
				}

				setIsEditDescription(false)
			})
		})
	}

	return (
		<div
			className={cn(
				'flex items-start space-x-2 rounded-md border border-foreground/20 p-2',
				{ 'border-primary': markDone }
			)}
		>
			<div className='flex w-1/3 items-center gap-4 overflow-hidden'>
				<Checkbox
					checked={markDone}
					onCheckedChange={() => setMarkDone(!markDone)}
				/>
				{isEditTitle ? (
					<Form {...changeTitleForm}>
						<form
							onSubmit={changeTitleForm.handleSubmit(onChangeTitle)}
							className='flex items-center gap-1'
						>
							<FormInput
								form={changeTitleForm}
								name='title'
								ref={formInputTitleRef}
								disabledErrorMessage={true}
								type='text'
								className={cn(
									'w-48  bg-transparent  text-lg font-bold tracking-wider shadow-none',
									'focus:outline-none focus:ring-0',
									'focus-visible:outline-none focus-visible:ring-0'
								)}
								onBlur={() => changeTitleForm.handleSubmit(onChangeTitle)}
							/>
							{isChangeTitlePending && (
								<Loader2 className='h-6 w-5 animate-spin' />
							)}
						</form>
					</Form>
				) : (
					<p
						className={cn('text-lg font-bold', {
							'line-through': markDone
						})}
						onClick={() => {
							setIsEditTitle(true)
						}}
					>
						{todoTitle}
					</p>
				)}
			</div>
			<ChevronRight className='h-5 w-5' />

			{isEditDescription ? (
				<Form {...changeDescriptionForm}>
					<form
						onSubmit={changeDescriptionForm.handleSubmit(onChangeDescription)}
						className='relative flex items-center gap-1'
					>
						<FormTextarea
							form={changeDescriptionForm}
							name='description'
							ref={formInputDescriptionRef}
							disabledErrorMessage={true}
							className={cn(
								'w-[230px] bg-transparent shadow-none',
								'focus:outline-none focus:ring-0',
								'focus-visible:outline-none focus-visible:ring-0'
							)}
						/>

						<Button
							className='absolute -right-[57px] bottom-0'
							type='submit'
							size='sm'
						>
							{isChangeDescriptionPending ? (
								<Loader2 className='h-6 w-5 animate-spin' />
							) : (
								<Save className='text-white' />
							)}
						</Button>
					</form>
				</Form>
			) : (
				<p
					className={cn('max-h-[120px] flex-1 overflow-y-auto', {
						'opacity-50': markDone
					})}
					onClick={() => {
						setIsEditDescription(true)
					}}
				>
					{todoDescription}
				</p>
			)}

			<Button
				variant='destructive'
				size='sm'
				onClick={onRemoveTodo}
			>
				{isRemoveTodoPending ? (
					<Loader2 className='h-6 w-5 animate-spin' />
				) : (
					<Trash />
				)}
			</Button>
		</div>
	)
}
