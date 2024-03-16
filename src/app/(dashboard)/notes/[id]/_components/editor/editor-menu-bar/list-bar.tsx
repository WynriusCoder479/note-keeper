import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { List, ListOrdered } from 'lucide-react'

type ListBarProps = {
	editor: Editor
	className?: string
}

export const ListBar = ({ editor, className }: ListBarProps) => {
	return (
		<>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('bulletList')
					},
					className
				)}
			>
				<List className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('orderedList')
					},
					className
				)}
			>
				<ListOrdered className='h-6 w-6' />
			</button>
		</>
	)
}
