'use client'

import { updateNoteContent } from '@/actions/notes/update-note-content'
import { Button } from '@/components/ui/button'
import { Editor } from '@tiptap/react'
import { useTransition } from 'react'
import { FontBar } from './font-bar'
import { DecoratorBar } from './decorator-bar'
import { HeadingBar } from './heading-bar'
import { ListBar } from './list-bar'
import { BlockBar } from './block-bar'
import { TextAlignBar } from './text-align-bar'
import { UploadImageButton } from './upload-image-button'
import { UndoRedoBar } from './undo-redo-bar'
import { MobileHeadingBar } from './mobile-heading-bar'
import { MobileListBar } from './mobile-list-bar'
import { MobileTextAlignBar } from './mobile-text-align'
import { cn } from '@/lib/utils'

type EditorMenubarProps = {
	editor: Editor

	save: () => void
	isPending: boolean
}

const EditorMenubar = ({ editor, save, isPending }: EditorMenubarProps) => {
	return (
		<div className='flex w-full items-center justify-between space-x-6 rounded-t-lg border-b border-foreground/20 bg-secondary p-4 '>
			<div className='flex flex-1 flex-wrap gap-3'>
				<FontBar editor={editor} />
				<DecoratorBar editor={editor} />
				<HeadingBar
					editor={editor}
					className='hidden lg:block'
				/>
				<MobileHeadingBar
					editor={editor}
					className='lg:hidden'
				/>
				<ListBar
					editor={editor}
					className='hidden lg:block'
				/>
				<MobileListBar
					editor={editor}
					className='lg:hidden'
				/>
				<BlockBar editor={editor} />
				<TextAlignBar
					editor={editor}
					className='hidden lg:block'
				/>
				<MobileTextAlignBar
					editor={editor}
					className='lg:hidden'
				/>
				<UploadImageButton />
				<UndoRedoBar editor={editor} />
			</div>
			<button
				className={cn(
					'rounded-md bg-gradient-to-r from-primary to-primary/60 p-2',
					'hover:from-primary/50 hover:to-primary/10',
					'active:bg-primary/10'
				)}
				onClick={() => {
					save()
				}}
			>
				{isPending ? '...saving' : 'saved'}
			</button>
		</div>
	)
}

export default EditorMenubar
