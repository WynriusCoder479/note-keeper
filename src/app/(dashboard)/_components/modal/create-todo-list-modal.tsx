'use client'

import { createTodoList } from '@/actions/todo-lists/create-todo-list'
import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { FormCheckbox } from '@/components/ui/form-checkbox'
import { FormInput } from '@/components/ui/form-input'
import {
	CreateTodoListSchema,
	CreateTodoListSchemaType,
	TodoItemSchemaType
} from '@/lib/schemas/todo-list'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AddTodo } from './add-todo'

export const CreateTodoListModal = () => {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const [items, setItems] = useState<TodoItemSchemaType[]>([])
	const [error, setError] = useState<string | undefined>(undefined)

	const form = useForm<CreateTodoListSchemaType>({
		resolver: zodResolver(CreateTodoListSchema),
		defaultValues: {
			title: '',
			isPin: false,
			description: '',
			items: []
		}
	})

	const onSubmit = (values: CreateTodoListSchemaType) => {
		setError(undefined)

		startTransition(() => {
			values.items = items

			createTodoList(values).then(data => {
				const { type, error, data: todoLists } = data

				if (type === 'success' && todoLists) {
					if (todoLists.isPin) router.push(`/?tab=todo-list-board`)
					else router.push(`/todo-lists`)

					toast('Create Todo List successfully', {
						description: Date.now()
					})
				}
				if (type === 'error') {
					setError(error)
				}
			})
		})
	}

	return (
		<DialogContent className='backdrop-blur-lg'>
			<DialogHeader>
				<DialogTitle className='text-center text-2xl font-bold text-primary'>
					Create TOdo List
				</DialogTitle>
			</DialogHeader>
			<div className='px-2 py-4'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'
					>
						<FormInput
							form={form}
							name='title'
							placeholder='e.g Todo keeper'
							label='Title'
							disabled={isPending}
						/>
						<FormInput
							form={form}
							name='description'
							placeholder='e.g Just work'
							label='Desscription'
							disabled={isPending}
						/>

						<FormCheckbox
							form={form}
							name='isPin'
							label='Pin your note on board'
							disabled={isPending}
						/>
						<AddTodo
							items={items}
							setItems={setItems}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button
									variant='outline'
									size='lg'
									disabled={isPending}
								>
									Cancel
								</Button>
							</DialogClose>
							<Button
								type='submit'
								disabled={isPending}
							>
								Create your Todo List
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</div>
		</DialogContent>
	)
}
