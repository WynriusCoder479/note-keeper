'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Editor } from '@tiptap/react'
import { UploadImage } from '@/components/utils/upload-image'

type UploadImageModalProps = {
	editor: Editor
	open: boolean
	onClose: () => void
}

export const UploadImageModal = ({
	editor,
	open,
	onClose
}: UploadImageModalProps) => {
	return (
		<Dialog
			onOpenChange={onClose}
			open={open}
		>
			<DialogContent className='w-fit px-12 py-4'>
				<UploadImage
					editor={editor}
					closeModal={onClose}
				/>
			</DialogContent>
		</Dialog>
	)
}
