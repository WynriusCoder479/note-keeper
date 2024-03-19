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

const lists = [
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

	const pickList = () => {
		if (editor.isActive('bulletlist')) {
			const { icon: Icon } = lists[0]

			return (
				<div className='flex w-full items-center justify-center gap-4'>
					<Icon className='h-6 w-6' />
				</div>
			)
		}

		if (editor.isActive('orderedlist')) {
			const { icon: Icon } = lists[1]

			return (
				<div className='flex w-full items-center justify-center gap-4'>
					<Icon className='h-6 w-6' />
				</div>
			)
		}

		return (
			<div className='flex w-full items-center justify-center gap-4'>
				<List className='h-6 w-6' />
			</div>
		)
	}

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
					{pickList()}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>List</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{lists.map(list => (
						<ListMenuItem
							key={list.label}
							{...list}
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
	editor
}: ListType & {
	editor: Editor
}) => {
	return (
		<DropdownMenuItem
			onClick={() => {
				handler(editor)
			}}
			className='flex items-center justify-between'
		>
			<Icon className='mr-2 h-6 w-6' />
			<span>{label}</span>
		</DropdownMenuItem>
	)
}
