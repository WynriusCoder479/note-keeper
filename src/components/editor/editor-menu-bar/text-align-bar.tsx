import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react'

type TextAlignBarProps = {
	editor: Editor
	className?: string
}

export const TextAlignBar = ({ editor, className }: TextAlignBarProps) => {
	return (
		<>
			<button
				onClick={() => editor.chain().focus().setTextAlign('left').run()}
				disabled={!editor.can().chain().focus().setTextAlign('left').run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive({ textAlign: 'left' })
					},
					className
				)}
			>
				<AlignLeft className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('right').run()}
				disabled={!editor.can().chain().focus().setTextAlign('right').run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive({ textAlign: 'right' })
					},
					className
				)}
			>
				<AlignRight className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('center').run()}
				disabled={!editor.can().chain().focus().setTextAlign('center').run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive({ textAlign: 'center' })
					},
					className
				)}
			>
				<AlignCenter className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().setTextAlign('justify').run()}
				disabled={!editor.can().chain().focus().setTextAlign('justify').run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive({ textAlign: 'justify' })
					},
					className
				)}
			>
				<AlignJustify className='h-6 w-6' />
			</button>
		</>
	)
}
