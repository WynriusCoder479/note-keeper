'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { formatTimeToNow } from '@/lib/utils'
import { Note } from '@prisma/client'
import { TooltipTrigger } from '@radix-ui/react-tooltip'
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
import { NotePreview } from '../editor/preview-note'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider } from '../ui/tooltip'
import Link from 'next/link'
import { useCallback, useTransition } from 'react'
import { pinOrUnpin } from '@/actions/notes/pin-or-unpin'
import { toast } from 'sonner'
import { removeNote } from '@/actions/notes/remove-note'
import { archiveNote } from '@/actions/notes/archive-note'
import { restoreNote } from '@/actions/notes/restore-note'

type NotePreviewCardProps = {
	note: Note
}

export const NotePreviewCard = ({ note }: NotePreviewCardProps) => {
	const [isPinNotePending, startPinNoteTransition] = useTransition()
	const [isRemoveNotePending, startRemoveNoteTransition] = useTransition()
	const [isArchiveNotePending, startArchiveNoteTransition] = useTransition()
	const [isRestoreNotePending, startRestoreNoteTransition] = useTransition()

	const onPinOrUnpinNote = useCallback(() => {
		startPinNoteTransition(async () => {
			const { type } = await pinOrUnpin(note.id)

			if (type === 'success') {
				toast('Has pinned/unpinned successfully', {
					description: format(Date.now(), 'yyyy-MM-dd')
				})
			}
		})
	}, [note.id])

	const onRemoveNote = useCallback(() => {
		startArchiveNoteTransition(async () => {
			const { type } = await removeNote(note.id)

			if (type === 'success') {
				toast('Remove note successfully', {
					description: format(Date.now(), 'yyyy-MM-dd')
				})
			}
		})
	}, [note.id])

	const onArchiveNote = useCallback(() => {
		startRemoveNoteTransition(async () => {
			const { type } = await archiveNote(note.id)

			if (type === 'success') {
				toast('Archive note successfully', {
					description: format(Date.now(), 'yyyy-MM-dd')
				})
			}
		})
	}, [note.id])

	const onRestoreNote = useCallback(() => {
		startRestoreNoteTransition(async () => {
			const { type } = await restoreNote(note.id)

			if (type === 'success') {
				toast('Restore note successfully', {
					description: format(Date.now(), 'yyyy-MM-dd')
				})
			}
		})
	}, [note.id])

	return (
		<Card className='relative h-fit w-[350px]'>
			<div className='absolute right-1 top-1 flex items-center gap-3 '>
				{!note.isArchive ? (
					<TooltipProvider>
						<Tooltip delayDuration={50}>
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									onClick={onArchiveNote}
								>
									{isArchiveNotePending ? (
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
								<p>Archive note</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				) : (
					<TooltipProvider>
						<Tooltip delayDuration={50}>
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									onClick={onRestoreNote}
								>
									{isRestoreNotePending ? (
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
								<p>Restore note</p>
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
								onClick={onPinOrUnpinNote}
								disabled={isPinNotePending}
							>
								{isPinNotePending ? (
									<Loader2 className='h-5 w-5 animate-spin' />
								) : (
									<>
										{note.isPin ? (
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
							<p>{note.isPin ? 'Unpin' : 'Pin'}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			<CardHeader className='gap-y-2'>
				<CardTitle className='text-3xl font-black'>{note.title}</CardTitle>
				<CardDescription className='flex flex-col '>
					<p>
						Created at: {format(note.createdAt, 'yyyy-MM-dd')} - (
						{formatTimeToNow(note.createdAt)})
					</p>
					<p>
						Last update: {format(note.updatedAt, 'yyyy-MM-dd')} - (
						{formatTimeToNow(note.updatedAt)})
					</p>
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2 overflow-hidden px-2 pb-2'>
				<p className='ml-2 tracking-wider'>Preview content:</p>
				<NotePreview content={note.content} />
			</CardContent>

			<CardFooter className='flex justify-between'>
				<TooltipProvider>
					<Tooltip delayDuration={50}>
						<TooltipTrigger asChild>
							<Button
								variant='destructive'
								onClick={onRemoveNote}
							>
								{isRemoveNotePending ? (
									<Loader2 className='h-5 w-5 animate-spin' />
								) : (
									<Trash className='h-5 w-5' />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent
							className='bg-destructive text-white'
							side='bottom'
						>
							<p>Remove note</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip delayDuration={50}>
						<TooltipTrigger asChild>
							<Button
								variant='default'
								asChild
							>
								<Link href={`/notes/${note.id}`}>
									<Pencil className='h-5 w-5 text-white' />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent
							className='bg-primary text-white'
							side='bottom'
						>
							<p>Edit</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardFooter>
		</Card>
	)
}
