'use client'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import CodeBlock from '@tiptap/extension-code-block'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Link from '@tiptap/extension-link'
import BulletList from '@tiptap/extension-bullet-list'
import ImageResize from 'tiptap-extension-resize-image'
import { StarterKit } from '@tiptap/starter-kit'

import { EditorContent, useEditor } from '@tiptap/react'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useEmbedImageModal } from '@/hooks/use-embed-image-modal'
import { useUploadImageModal } from '@/hooks/use-upload-image-modal'

import { updateNoteContent } from '@/actions/notes/update-note-content'

import EditorMenubar from '@/components/editor/editor-menu-bar'
import { InsertImageModal } from '@/components/modal/insert-image-modal'
import { UploadImageModal } from '@/components/modal/upload-image-modal'
import { useChooseImageModal } from '@/hooks/use-choose-image-modal'
import { ChooseImageModal } from '@/components/modal/choose-image-modal'
import { useAddLinkModal } from '@/hooks/use-add-link-modal'
import { AddLinkModal } from '@/components/modal/add-link-modal'

import { Loader2 } from 'lucide-react'

type EditorProps = {
	content: string
	noteId: string
}

const font = Inter({
	subsets: ['latin', 'vietnamese']
})

const Editor = ({ content: noteContent, noteId }: EditorProps) => {
	const [contentRecentlyChanged, setContentRecentlyChanged] =
		useState<boolean>(false)

	const [isSaveNote, startSaveNote] = useTransition()

	const saveNote = useCallback(
		(content: string) => {
			startSaveNote(() => {
				updateNoteContent(noteId, {
					content
				})
			})
		},
		[noteId]
	)

	const editor = useEditor({
		autofocus: true,
		extensions: [
			StarterKit,
			Image,
			ImageResize,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
				defaultAlignment: 'left'
			}),
			CodeBlock,
			Underline,
			Table.configure({
				resizable: true
			}),
			TableRow,
			TableHeader,
			TableCell,
			ListItem,
			BulletList,
			OrderedList,
			Link.configure({
				openOnClick: false,
				autolink: true,
				HTMLAttributes: {
					class:
						'text-primary underline underline-offset-2 cursor-pointer hover:text-primary/60'
				}
			})
		],
		content: noteContent,
		onUpdate: ({ editor }) => {
			if (!contentRecentlyChanged) {
				setContentRecentlyChanged(true)
			}
		}
	})

	useEffect(() => {
		const saveInterval = setTimeout(() => {
			if (editor && contentRecentlyChanged) {
				const currentContent = editor.getHTML()

				saveNote(currentContent)
				setContentRecentlyChanged(false)
			}

			return () => clearTimeout(saveInterval)
		}, 1000 * 5)
	}, [editor, contentRecentlyChanged, saveNote])

	const { open: openUploadImageModal, onClose: onCloseUploadImageModal } =
		useUploadImageModal()
	const { open: openEmbedImageModal, onClose: onCLoseEmbedImageModal } =
		useEmbedImageModal()
	const { open: openChooseImageModal, onClose: onCloseChooseImageModal } =
		useChooseImageModal()
	const { open: openAddLinkModal, onClose: onCloseAddLinkModal } =
		useAddLinkModal()

	return (
		<div>
			{editor ? (
				<>
					<InsertImageModal
						editor={editor}
						open={openEmbedImageModal}
						onClose={onCLoseEmbedImageModal}
					/>
					<UploadImageModal
						editor={editor}
						open={openUploadImageModal}
						onClose={onCloseUploadImageModal}
					/>
					<ChooseImageModal
						editor={editor}
						open={openChooseImageModal}
						onClose={onCloseChooseImageModal}
					/>
					<AddLinkModal
						editor={editor}
						open={openAddLinkModal}
						onClose={onCloseAddLinkModal}
					/>

					<div className='p-4'>
						<div className='mx-auto max-w-4xl rounded-lg bg-secondary/50 shadow-lg backdrop-blur-lg'>
							<EditorMenubar
								editor={editor}
								isPending={isSaveNote}
								save={saveNote}
							/>

							<div className='prose prose-sm mt-4 max-h-[32rem] w-full overflow-y-auto p-4 md:max-h-[37rem]'>
								<EditorContent
									editor={editor}
									className={cn(font.className)}
								/>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className='flex h-32 w-full items-center justify-center'>
					<Loader2 className='h-10 w-10 animate-spin' />
					<p className='text-2xl font-bold'>Loading Note</p>
				</div>
			)}
		</div>
	)
}

export default Editor
