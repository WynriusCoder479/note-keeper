'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Editor } from '@tiptap/react'
import { ChangeEvent, useState } from 'react'

type InsertImageModalProps = {
	editor: Editor
	open: boolean
	onClose: () => void
}

export const InsertImageModal = ({
	editor,
	open,
	onClose
}: InsertImageModalProps) => {
	const [url, setUrl] = useState<string>('')

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUrl(e.currentTarget.value)
	}

	const onInsertImage = () => {
		editor.chain().focus().setImage({ src: url }).run()
		setUrl('')
		onClose()
	}

	return (
		<Dialog
			onOpenChange={onClose}
			open={open}
		>
			<DialogContent className='px-12 py-4'>
				<DialogHeader>
					<DialogTitle className='text-center text-xl font-bold'>
						Insert image
					</DialogTitle>
					<div className='flex flex-col gap-2 space-y-3 pb-2 pt-6'>
						<Input
							onChange={handleOnChange}
							value={url}
							placeholder='https://image.com'
						/>
					</div>
					<DialogFooter>
						<Button
							disabled={url.length === 0}
							onClick={onInsertImage}
						>
							Insert
						</Button>
						<DialogClose>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
