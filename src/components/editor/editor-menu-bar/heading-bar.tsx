import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import {
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6
} from 'lucide-react'

type HeadingBarProps = {
	editor: Editor
	className?: string
}

export const HeadingBar = ({ editor, className }: HeadingBarProps) => {
	return (
		<>
			<button
				onClick={() => editor.chain().focus().setParagraph().run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('paragraph')
					},
					className
				)}
			>
				<p className='text-lg'>n</p>
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('heading', { level: 1 })
					},
					className
				)}
			>
				<Heading1 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('heading', { level: 2 })
					},
					className
				)}
			>
				<Heading2 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('heading', { level: 3 })
					},
					className
				)}
			>
				<Heading3 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('heading', { level: 4 })
					},
					className
				)}
			>
				<Heading4 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('heading', { level: 5 })
					},
					className
				)}
			>
				<Heading5 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				className={cn(
					'flex h-8 w-8 items-center justify-center rounded-md p-1',
					'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
					{
						'is-active': editor.isActive('heading', { level: 6 })
					},
					className
				)}
			>
				<Heading6 className='h-6 w-6' />
			</button>
		</>
	)
}
