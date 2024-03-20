'use client'

import { archiveNote } from '@/actions/notes/archive-note'
import { pinOrUnpin } from '@/actions/notes/pin-or-unpin'
import { removeNote } from '@/actions/notes/remove-note'
import { restoreNote } from '@/actions/notes/restore-note'
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
import Link from 'next/link'
import { useCallback, useTransition } from 'react'
import { toast } from 'sonner'
import { NotePreview } from '../editor/preview-note'
import { Button } from '../ui/button'

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
					<Button
						variant='ghost'
						onClick={onArchiveNote}
						disabled={isArchiveNotePending}
					>
						{isArchiveNotePending ? (
							<Loader2 className='h-5 w-5 animate-spin' />
						) : (
							<Archive className='h-5 w-5' />
						)}
					</Button>
				) : (
					<Button
						variant='ghost'
						onClick={onRestoreNote}
						disabled={isRemoveNotePending}
					>
						{isRestoreNotePending ? (
							<Loader2 className='h-5 w-5 animate-spin' />
						) : (
							<ArchiveRestore className='h-5 w-5' />
						)}
					</Button>
				)}

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
			</div>
			<CardHeader className='gap-y-2 pt-12'>
				<CardTitle className='text-3xl font-black'>{note.title}</CardTitle>
				<CardDescription className='flex flex-col '>
					{`Created at: ${format(note.createdAt, 'yyyy-MM-dd')} - (${formatTimeToNow(note.createdAt)})`}
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2 overflow-hidden px-2 pb-2'>
				<p className='ml-2 tracking-wider'>Preview content:</p>
				<NotePreview content={note.content} />
			</CardContent>

			<CardFooter className='flex justify-between'>
				<Button
					variant='destructive'
					onClick={onRemoveNote}
					disabled={isRemoveNotePending}
				>
					{isRemoveNotePending ? (
						<Loader2 className='h-5 w-5 animate-spin' />
					) : (
						<Trash className='h-5 w-5' />
					)}
				</Button>

				{!note.isArchive && (
					<Button
						variant='default'
						asChild
					>
						<Link href={`/notes/${note.id}`}>
							<Pencil className='h-5 w-5 text-white' />
						</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}
