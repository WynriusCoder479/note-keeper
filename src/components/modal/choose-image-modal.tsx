'use client'

import { getAblum } from '@/actions/image/get-album'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useUploadImageModal } from '@/hooks/use-upload-image-modal'
import { useEdgeStore } from '@/lib/edgestore'
import { Image as ImageType } from '@prisma/client'
import { Editor } from '@tiptap/react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

type InsertImageModalProps = {
	editor: Editor
	open: boolean
	onClose: () => void
}

export const ChooseImageModal = ({
	editor,
	open,
	onClose
}: InsertImageModalProps) => {
	const [images, setImages] = useState<ImageType[] | undefined>(undefined)
	const [urls, setUrls] = useState<string[]>([])
	const { edgestore } = useEdgeStore()

	useEffect(() => {
		const getUserAlbum = async () => {
			const userAlbum = await getAblum()

			if (userAlbum.data) setImages(userAlbum.data.images)
		}

		getUserAlbum()
	}, [])

	const { onOpen: onOpenUploadImageModal } = useUploadImageModal()

	const handleGotoUploadImage = () => {
		onClose()
		onOpenUploadImageModal()
	}

	const handleRemoveImageFromAlbum = useCallback(
		async (url: string) => {
			setImages(images => {
				if (!images) return

				return images.filter(image => image.url !== url)
			})

			await edgestore.publicFiles.delete({
				url
			})
		},
		[edgestore.publicFiles]
	)

	const handleSetImages = () => {
		if (urls.length === 0) {
			onClose()
			return
		}

		for (const url of urls) {
			editor.chain().focus().setImage({ src: url }).run()
		}
		setUrls([])
		onClose()
	}

	return (
		<Dialog
			onOpenChange={onClose}
			open={open}
		>
			<DialogContent className='px-4 py-4'>
				<DialogHeader>
					<DialogTitle className='text-center text-xl font-bold'>
						Insert image
					</DialogTitle>
					<div className='flex h-60 flex-wrap gap-2 overflow-y-auto rounded-md border border-secondary/80 p-1'>
						{!images ? (
							<>
								<Skeleton className='h-24 w-[9.25rem] rounded-md' />
								<Skeleton className='h-24 w-[9.25rem] rounded-md' />
								<Skeleton className='h-24 w-[9.25rem] rounded-md' />
								<Skeleton className='h-24 w-[9.25rem] rounded-md' />
								<Skeleton className='h-24 w-[9.25rem] rounded-md' />
								<Skeleton className='h-24 w-[9.25rem] rounded-md' />
								<Skeleton className='h-24 w-[9.25rem] rounded-md' />
								<Skeleton className='h-24 w-[9.25rem] rounded-md' />
							</>
						) : (
							<>
								{images.length === 0 ? (
									<div className='flex w-full flex-col items-center justify-center space-y-2'>
										<p className=''>No Image</p>
										<Button
											variant='link'
											onClick={handleGotoUploadImage}
										>
											Go to upload image
										</Button>
									</div>
								) : (
									<>
										{images.map(image => (
											<div
												key={image.id}
												className='relative'
											>
												<button
													onClick={() => {
														handleRemoveImageFromAlbum(image.url)
													}}
													className='absolute -right-0.5 -top-0.5 cursor-pointer rounded-md border border-secondary/50 bg-secondary/70 p-0.5 text-white transition-all duration-150 ease-in-out hover:bg-destructive/70 active:bg-destructive'
												>
													<X className='h-4 w-4' />
												</button>
												<input
													type='checkbox'
													className={`peer hidden`}
													id={image.id}
													onChange={e => {
														if (e.currentTarget.checked) {
															setUrls(url => [...url, image.url])
															return
														}
														setUrls(url =>
															url.filter(thisUrl => thisUrl !== image.url)
														)
													}}
												/>

												<label
													htmlFor={image.id}
													className='inline-flex h-24 w-[9.25rem] cursor-pointer items-center rounded-md border-4 border-foreground/20 bg-secondary peer-checked:border-primary/50 peer-checked:p-0.5'
												>
													<Image
														src={image.url}
														alt={image.url}
														width={300}
														height={300}
														className='h-full w-full rounded-sm'
													/>
												</label>
											</div>
										))}
									</>
								)}
							</>
						)}
					</div>
					<DialogFooter className='pt-6'>
						<Button
							disabled={urls.length === 0}
							onClick={handleSetImages}
						>
							Ok
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
