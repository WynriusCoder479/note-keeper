'use client'

import Image from '@tiptap/extension-image'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import ImageResize from 'tiptap-extension-resize-image'
import EditorMenubar from './editor-menu-bar'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

type EditorProps = {
	content: string
}

const font = Inter({
	subsets: ['latin', 'vietnamese']
})

const Editor = ({ content: noteContent }: EditorProps) => {
	const [content, setContent] = useState<string>(noteContent)

	const editor = useEditor({
		autofocus: true,
		extensions: [StarterKit, Image, ImageResize],
		content: noteContent,
		onUpdate: ({ editor }) => {
			setContent(editor.getHTML())
		}
	})

	useEffect(() => {
		console.log(content)
	}, [content])

	return (
		<>
			<div className='flex'>{editor && <EditorMenubar editor={editor} />}</div>
			<div className='prose prose-sm mt-4 w-full'>
				<EditorContent
					editor={editor}
					className={cn(font.className)}
				/>
			</div>
		</>
	)
}

export default Editor
