import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { Code, Strikethrough, Underline } from 'lucide-react'

type DecoratorBarProps = {
	editor: Editor
}

export const DecoratorBar = ({ editor }: DecoratorBarProps) => {
	return (
		<>
			<button
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				disabled={!editor.can().chain().focus().toggleUnderline().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('underline')
					}
				)}
			>
				<Underline className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('strike')
					}
				)}
			>
				<Strikethrough className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('code')
					}
				)}
			>
				<Code className='h-6 w-6' />
			</button>
		</>
	)
}
