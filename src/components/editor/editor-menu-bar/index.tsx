'use client'

import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { BlockBar } from './block-bar'
import { DecoratorBar } from './decorator-bar'
import { FontBar } from './font-bar'
import { HeadingBar } from './heading-bar'
import { ListBar } from './list-bar'
import { MobileHeadingBar } from './mobile-heading-bar'
import { MobileListBar } from './mobile-list-bar'
import { MobileTextAlignBar } from './mobile-text-align'
import { TextAlignBar } from './text-align-bar'
import { UndoRedoBar } from './undo-redo-bar'
import { UploadImageButton } from './upload-image-button'
import { Loader2 } from 'lucide-react'
import { TableButton } from './table-button'
import { LinkButton } from './link-button'

type EditorMenubarProps = {
	editor: Editor
	isPending: boolean
	save: (content: string) => void
}

const EditorMenubar = ({ editor, isPending, save }: EditorMenubarProps) => {
	return (
		<div className='flex w-full items-center justify-between space-x-6 rounded-t-lg border-b border-foreground/20 bg-secondary p-4 '>
			<div className='flex flex-1 flex-wrap gap-3'>
				<FontBar editor={editor} />
				<DecoratorBar editor={editor} />
				<LinkButton editor={editor} />
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
				<TableButton editor={editor} />
				<UndoRedoBar editor={editor} />
			</div>
			<button
				className={cn(
					'rounded-md bg-gradient-to-r from-primary to-primary/60 p-2',
					'hover:from-primary/50 hover:to-primary/10',
					'active:bg-primary/10'
				)}
				onClick={() => save(editor.getHTML())}
			>
				{isPending ? (
					<div className='flex items-center justify-between gap-2'>
						<Loader2 className='h-3 w-3 animate-spin' />
						<p>saving</p>
					</div>
				) : (
					'saved'
				)}
			</button>
		</div>
	)
}

export default EditorMenubar
