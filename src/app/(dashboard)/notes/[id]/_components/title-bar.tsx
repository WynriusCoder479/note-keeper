'use client'

import { updateNoteTitle } from '@/actions/notes/update-note-title'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormInput } from '@/components/ui/form-input'
import {
	UpdateNoteTitleSchema,
	UpdateNoteTitleSchemaType
} from '@/lib/schemas/note'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Loader2, Trash } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type TitleBarProps = {
	noteId: string
	title: string
}

export const TitleBar = ({ noteId, title }: TitleBarProps) => {
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [currentTitle, setCurrentTitle] = useState(title)
	const [isPending, startTransition] = useTransition()
	const formInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		formInputRef.current?.focus()
	}, [isEdit])

	const form = useForm<UpdateNoteTitleSchemaType>({
		resolver: zodResolver(UpdateNoteTitleSchema),
		defaultValues: {
			title: title
		}
	})

	const onSubmit = (values: UpdateNoteTitleSchemaType) => {
		startTransition(() => {
			updateNoteTitle(noteId, values).then(data => {
				const { data: updatedNote } = data

				if (updatedNote) {
					toast('Change Title Successfully', {
						description: Date.now()
					})

					setCurrentTitle(updatedNote.title)
				}

				setIsEdit(false)
			})
		})
	}

	return (
		<div className='sticky inset-0 z-50 w-full bg-background px-4 py-2 shadow-md'>
			<div className='flex w-full items-center justify-between'>
				<Button
					variant='ghost'
					size='sm'
					asChild
				>
					<Link href='/notes'>
						<ArrowLeft className='h-6 w-6' />
					</Link>
				</Button>

				{isEdit ? (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='flex items-center gap-1'
						>
							<FormInput
								form={form}
								name='title'
								ref={formInputRef}
								disabledErrorMessage={true}
								type='text'
								className={cn(
									'w-48  bg-transparent  text-lg font-bold tracking-wider shadow-none',
									'focus:outline-none focus:ring-0',
									'focus-visible:outline-none focus-visible:ring-0'
								)}
								onBlur={() => form.handleSubmit(onSubmit)}
							/>
							{isPending && <Loader2 className='h-6 w-5 animate-spin' />}
						</form>
					</Form>
				) : (
					<h2
						onClick={() => {
							setIsEdit(true)
						}}
						className='text-xl font-bold tracking-wider'
					>
						{currentTitle}
					</h2>
				)}

				<Button
					className='hover:bg-destructive'
					variant='ghost'
					size='sm'
				>
					<Trash className='h-6 w-6' />
				</Button>
			</div>
		</div>
	)
}
