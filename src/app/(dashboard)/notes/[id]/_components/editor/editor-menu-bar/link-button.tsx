'use client'

import { useAddLinkModal } from '@/hooks/use-add-link-modal'
import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import { Link } from 'lucide-react'

type LinkButtonProps = {
	editor: Editor
}

export const LinkButton = ({ editor }: LinkButtonProps) => {
	const { onOpen } = useAddLinkModal()

	const handle = () => {
		onOpen()
	}

	return (
		<button
			onClick={handle}
			disabled={!editor.isActive('link')}
			className={cn(
				'flex h-8 w-8 items-center justify-center rounded-md p-1',
				'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
				{
					'is-active': editor.isActive('link')
				}
			)}
		>
			<Link className='h-6 w-6' />
		</button>
	)
}
