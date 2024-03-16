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
import { List, ListIcon, ListOrderedIcon, LucideIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'

type MobileHeadingBarProps = {
	editor: Editor
	className?: string
}

type ListType = {
	label: string
	icon: LucideIcon
	handler: (editor: Editor) => void
}

const headings = [
	{
		label: 'Bullet list',
		icon: ListIcon,
		handler: editor => editor.chain().focus().toggleBulletList().run()
	},
	{
		label: 'Ordered list',
		icon: ListOrderedIcon,
		handler: editor => editor.chain().focus().toggleOrderedList().run()
	}
] satisfies ListType[]

export const MobileListBar = ({ editor, className }: MobileHeadingBarProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const [list, setList] = useState<
		Pick<ListType, 'label' | 'icon'> | undefined
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
					{list ? (
						<div className='flex w-full items-center justify-center gap-4'>
							<list.icon className='h-6 w-6' />
						</div>
					) : (
						<div className='flex w-full items-center  justify-center gap-4'>
							<List className='h-6 w-6' />
						</div>
					)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>List</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{headings.map(heading => (
						<ListMenuItem
							key={heading.label}
							{...heading}
							setList={setList}
							editor={editor}
						/>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const ListMenuItem = ({
	icon: Icon,
	label,
	handler,
	setList,
	editor
}: ListType & {
	editor: Editor
	setList: Dispatch<
		SetStateAction<Pick<ListType, 'icon' | 'label'> | undefined>
	>
}) => {
	return (
		<DropdownMenuItem
			onClick={() => {
				setList({
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
