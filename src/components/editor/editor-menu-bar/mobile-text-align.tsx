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
import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/react'
import {
	AlignCenter,
	AlignLeftIcon,
	AlignRightIcon,
	LucideIcon
} from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

type MobileHeadingBarProps = {
	editor: Editor
	className?: string
}

type AlignType = {
	label: string
	icon: LucideIcon
	handler: (editor: Editor) => void
}

const headings = [
	{
		label: 'Left',
		icon: AlignLeftIcon,
		handler: editor => editor.chain().focus().setTextAlign('left').run()
	},
	{
		label: 'Right',
		icon: AlignRightIcon,
		handler: editor => editor.chain().focus().setTextAlign('right').run()
	},
	{
		label: 'Center',
		icon: AlignCenter,
		handler: editor => editor.chain().focus().setTextAlign('center').run()
	},
	{
		label: 'Justify',
		icon: AlignRightIcon,
		handler: editor => editor.chain().focus().setTextAlign('justify').run()
	}
] satisfies AlignType[]

export const MobileTextAlignBar = ({
	editor,
	className
}: MobileHeadingBarProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const [align, setAlign] = useState<
		Pick<AlignType, 'label' | 'icon'> | undefined
	>(undefined)

	return (
		<DropdownMenu
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenuTrigger asChild>
				<button
					aria-expanded={open}
					className={cn(
						'flex h-8 w-8 items-center justify-center gap-2 rounded-md p-1',
						'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
						className
					)}
				>
					{align ? (
						<div className='flex w-full items-center justify-center gap-4'>
							<align.icon className='h-6 w-6' />
						</div>
					) : (
						<div className='flex w-full items-center  justify-center gap-4'>
							<AlignLeftIcon className='h-6 w-6' />
						</div>
					)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>List</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{headings.map(heading => (
						<AlignMenuItem
							key={heading.label}
							{...heading}
							setAlign={setAlign}
							editor={editor}
						/>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const AlignMenuItem = ({
	icon: Icon,
	label,
	handler,
	setAlign,
	editor
}: AlignType & {
	editor: Editor
	setAlign: Dispatch<
		SetStateAction<Pick<AlignType, 'icon' | 'label'> | undefined>
	>
}) => {
	return (
		<DropdownMenuItem
			onClick={() => {
				setAlign({
					label,
					icon: Icon
				})
				handler(editor)
			}}
			className='flex items-center justify-between'
		>
			<Icon className='mr-2 h-6 w-6' />
			<span>{label}</span>
		</DropdownMenuItem>
	)
}
