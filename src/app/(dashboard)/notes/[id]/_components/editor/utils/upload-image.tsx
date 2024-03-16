'use client'

import { uploadImage } from '@/actions/image/upload-image'
import { Button } from '@/components/ui/button'
import { SingleImageDropzone } from '@/components/ui/single-image-dropzone'
import { useEdgeStore } from '@/lib/edgestore'
import { Editor } from '@tiptap/react'
import { useState } from 'react'

type UploadImageProps = {
	editor: Editor
	closeModal: () => void
}

export function UploadImage({ editor, closeModal }: UploadImageProps) {
	const [file, setFile] = useState<File>()
	const { edgestore } = useEdgeStore()

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
				onClick={async () => {
					if (file) {
						const res = await edgestore.publicFiles.upload({
							file
						})

						await uploadImage(res.url)

						editor.chain().focus().setImage({ src: res.url }).run()
						closeModal()
					}
				}}
			>
				Upload
			</Button>
		</div>
	)
}
