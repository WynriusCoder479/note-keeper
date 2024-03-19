'use client'
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
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

type NotePreviewProps = {
	content: string
}

export const NotePreview = ({ content }: NotePreviewProps) => {
	const [isMounted, setIsMounted] = useState(false)

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
		content: content,
		editable: false
	})

	useEffect(() => {
		if (editor) {
			setIsMounted(true)
		}
	}, [editor])

	return (
		<div
			className={cn(
				'relative h-[250px] overflow-hidden rounded-md border border-foreground/20 p-1',
				{
					'flex items-center justify-center': !editor
				}
			)}
		>
			<div className='absolute inset-0 z-10 w-full bg-gradient-to-t from-transparent from-10% via-foreground/20 via-60% to-primary/70' />
			{isMounted ? (
				<>
					{editor ? (
						<EditorContent editor={editor} />
					) : (
						<Loader2 className='h-6 w-6 animate-spin' />
					)}
				</>
			) : null}
		</div>
	)
}
