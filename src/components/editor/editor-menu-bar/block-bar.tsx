import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { Container, Quote } from 'lucide-react'

type BlockBarProps = {
	editor: Editor
}

export const BlockBar = ({ editor }: BlockBarProps) => {
	return (
		<>
			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('codeBlock')
					}
				)}
			>
				<Container className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('blockquote')
					}
				)}
			>
				<Quote className='h-6 w-6' />
			</button>
		</>
	)
}
