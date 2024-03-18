'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useChooseImageModal } from '@/hooks/use-choose-image-modal'
import { useEmbedImageModal } from '@/hooks/use-embed-image-modal'
import { useUploadImageModal } from '@/hooks/use-upload-image-modal'
import { cn } from '@/lib/utils'
import { BookImage, CloudUpload, ImagePlus, Link } from 'lucide-react'

export const UploadImageButton = () => {
	const { onOpen: onOpenUploadImageModal } = useUploadImageModal()
	const { onOpen: onOpenEmbedImageModal } = useEmbedImageModal()
	const { onOpen: onOpenChooseImageModal } = useChooseImageModal()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					className={cn(
						'flex h-8 w-8 cursor-pointer items-center justify-center rounded-md p-1',
						'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
						'active:bg-gradient-to-r active:from-primary/50 active:to-primary'
					)}
				>
					<ImagePlus className='h-6 w-6' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel className='text-lg font-bold'>
					Image
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={onOpenEmbedImageModal}
					>
						<Link className='mr-2 h-4 w-4' />
						<span>Insert image URL</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={onOpenUploadImageModal}
					>
						<CloudUpload className='mr-2 h-4 w-4' />
						<span>Upload image</span>
					</DropdownMenuItem>
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={onOpenChooseImageModal}
					>
						<BookImage className='mr-2 h-4 w-4' />
						<span>Choose in Album</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
