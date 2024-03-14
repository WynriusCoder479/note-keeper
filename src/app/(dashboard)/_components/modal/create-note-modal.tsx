'use client'

import { createNote } from '@/actions/notes/create-note'
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
import { CreateNoteSchema, CreateNoteSchemaType } from '@/lib/schemas/note'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const CreateNoteModal = () => {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const [error, setError] = useState<string | undefined>(undefined)

	const form = useForm<CreateNoteSchemaType>({
		resolver: zodResolver(CreateNoteSchema),
		defaultValues: {
			title: '',
			isPin: false
		}
	})

	const onSubmit = (values: CreateNoteSchemaType) => {
		setError(undefined)

		startTransition(() => {
			createNote(values).then(data => {
				const { type, error, data: note } = data

				if (type === 'success' && note) {
					router.push(`/notes/${note.id}`)

					toast('Create note successfully', {
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
					Create Note
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
							placeholder='e.g Note keeper'
							label='Title'
							disabled={isPending}
						/>
						<FormCheckbox
							form={form}
							name='isPin'
							label='Pin your note on board'
							disabled={isPending}
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
								Create your Note
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</div>
		</DialogContent>
	)
}
