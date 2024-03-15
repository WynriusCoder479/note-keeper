import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import {
	Bold,
	Code,
	Container,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
	Italic,
	List,
	ListOrdered,
	Quote,
	Redo,
	Strikethrough,
	Undo
} from 'lucide-react'

const EditorMenubar = ({ editor }: { editor: Editor }) => {
	return (
		<div className='flex flex-wrap gap-3'>
			<button
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={!editor.can().chain().focus().toggleBold().run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('bold')
				})}
			>
				<Bold className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={!editor.can().chain().focus().toggleItalic().run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('italic')
				})}
			>
				<Italic className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={!editor.can().chain().focus().toggleStrike().run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('strike')
				})}
			>
				<Strikethrough className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={!editor.can().chain().focus().toggleCode().run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('code')
				})}
			>
				<Code className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('heading', { level: 1 })
				})}
			>
				<Heading1 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('heading', { level: 2 })
				})}
			>
				<Heading2 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('heading', { level: 3 })
				})}
			>
				<Heading3 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('heading', { level: 4 })
				})}
			>
				<Heading4 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('heading', { level: 5 })
				})}
			>
				<Heading5 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('heading', { level: 6 })
				})}
			>
				<Heading6 className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('bulletList')
				})}
			>
				<List className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('orderedList')
				})}
			>
				<ListOrdered className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('codeBlock')
				})}
			>
				<Container className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				className={cn('flex h-8 w-8 items-center justify-center p-1', {
					'is-active': editor.isActive('blockquote')
				})}
			>
				<Quote className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().chain().focus().undo().run()}
			>
				<Undo className='h-6 w-6' />
			</button>
			<button
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().chain().focus().redo().run()}
			>
				<Redo className='h-6 w-6' />
			</button>
		</div>
	)
}

export default EditorMenubar
