import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { Redo, Undo } from 'lucide-react'

type UndoRedoBarProps = {
	editor: Editor
}

export const UndoRedoBar = ({ editor }: UndoRedoBarProps) => {
	return (
		<>
			<button
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
				className={cn(
					'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					'active:bg-gradient-to-r active:from-primary/50 active:to-primary'
				)}
			>
				<Undo className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
				className={cn(
					'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					'active:bg-gradient-to-r active:from-primary/50 active:to-primary'
				)}
			>
				<Redo className='h-6 w-6' />
			</button>
		</>
	)
}
