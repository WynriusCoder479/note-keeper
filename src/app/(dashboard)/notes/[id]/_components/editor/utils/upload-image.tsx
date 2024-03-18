'use client'

import { uploadImage } from '@/actions/image/upload-image'
import { Button } from '@/components/ui/button'
import { SingleImageDropzone } from '@/components/ui/single-image-dropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { Editor } from '@tiptap/react'
import { Loader2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { useCallback, useState, useTransition } from 'react'

type UploadImageProps = {
	editor: Editor
	closeModal: () => void
}

export function UploadImage({ editor, closeModal }: UploadImageProps) {
	const [isPending, startTransition] = useTransition()
	const [file, setFile] = useState<File>()
	const { edgestore } = useEdgeStore()

	const handleUpload = useCallback(() => {
		startTransition(async () => {
			if (file) {
				const res = await edgestore.publicFiles.upload({
					file
				})

				await uploadImage(res.url)

				editor.chain().focus().setImage({ src: res.url }).run()

				closeModal()
			}
		})
	}, [closeModal, edgestore.publicFiles, editor, file])

	return (
		<div className='flex flex-col items-center justify-center gap-2'>
			<SingleImageDropzone
				width={400}
				height={300}
				value={file}
				onChange={file => {
					setFile(file)
				}}
			/>
			<Button
				onClick={handleUpload}
				disabled={isPending}
			>
				{isPending ? (
					<div className='flex items-center justify-center gap-2'>
						<Loader2 className='h-4 w-4 animate-spin' />
						<p>Uploading</p>
					</div>
				) : (
					'Upload'
				)}
			</Button>
		</div>
	)
}
