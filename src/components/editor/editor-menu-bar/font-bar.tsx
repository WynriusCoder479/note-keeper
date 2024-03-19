import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { Bold, Italic } from 'lucide-react'

type FontBarProps = {
	editor: Editor
}

export const FontBar = ({ editor }: FontBarProps) => {
	return (
		<>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('bold')
					}
				)}
			>
				<Bold className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('italic')
					}
				)}
			>
				<Italic className='h-6 w-6' />
			</button>
		</>
	)
}
