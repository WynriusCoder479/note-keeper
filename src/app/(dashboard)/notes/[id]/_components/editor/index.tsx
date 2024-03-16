'use client'

import CodeBlock from '@tiptap/extension-code-block'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useCallback, useEffect, useState, useTransition } from 'react'
import ImageResize from 'tiptap-extension-resize-image'

import { updateNoteContent } from '@/actions/notes/update-note-content'

import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import EditorMenubar from './editor-menu-bar'
import { UploadImageModal } from './modal/upload-image-modal'
import { useDebounceValue } from 'usehooks-ts'
import { useUploadImageModal } from '@/hooks/use-upload-image-modal'
import { useEmbedImageModal } from '@/hooks/use-embed-image-modal'
import { InsertImageModal } from './modal/insert-image-modal'

type EditorProps = {
	content: string
	noteId: string
}

const font = Inter({
	subsets: ['latin', 'vietnamese']
})

const Editor = ({ content: noteContent, noteId }: EditorProps) => {
	const [content, setContent] = useState<string>(noteContent)

	const textAligment = TextAlign.configure({
		types: ['heading', 'paragraph'],
		defaultAlignment: 'left'
	})

	const [isSaveNote, startSaveNote] = useTransition()

	const saveNote = useCallback(() => {
		startSaveNote(() => {
			updateNoteContent(noteId, {
				content
			})
		})
	}, [content, noteId])

	const editor = useEditor({
		autofocus: true,
		extensions: [
			StarterKit,
			Image,
			ImageResize,
			textAligment,
			CodeBlock,
			Underline
		],
		content: noteContent,
		onUpdate: ({ editor }) => {
			setContent(editor.getHTML())
		}
	})

	const [debounceContent] = useDebounceValue(content, 1000 * 5)

	useEffect(() => {
		if (debounceContent === '') return

		saveNote()
	}, [debounceContent, saveNote])

	const { open: openUploadImageModal, onClose: onCloseUploadImageModal } =
		useUploadImageModal()
	const { open: openEmbedImageModal, onClose: onCLoseEmbedImageModal } =
		useEmbedImageModal()

	return (
		<>
			{editor && (
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
				</>
			)}
			<div className='p-4'>
				<div className='mx-auto max-w-4xl rounded-lg bg-secondary/50 shadow-lg backdrop-blur-lg'>
					{editor && (
						<EditorMenubar
							editor={editor}
							save={saveNote}
							isPending={isSaveNote}
						/>
					)}

					<div className='prose prose-sm mt-4 max-h-[32rem] w-full overflow-y-auto p-4 md:max-h-[37rem]'>
						<EditorContent
							editor={editor}
							className={cn(font.className)}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default Editor
