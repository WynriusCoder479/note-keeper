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
	Heading1Icon,
	Heading2Icon,
	Heading3Icon,
	Heading4Icon,
	Heading5Icon,
	Heading6Icon,
	LucideIcon,
	WholeWordIcon
} from 'lucide-react'
import { useState } from 'react'

type MobileHeadingBarProps = {
	editor: Editor
	className?: string
}

type HeadingType = {
	label: string
	icon: LucideIcon | string
	handler: (editor: Editor) => void
}

const headings = [
	{
		label: 'Normal',
		icon: 'n',
		handler: editor => editor.chain().focus().setParagraph().run()
	},
	{
		label: 'Heading 1',
		icon: Heading1Icon,
		handler: editor => editor.chain().focus().toggleHeading({ level: 1 }).run()
	},
	{
		label: 'Heading 2',
		icon: Heading2Icon,
		handler: editor => editor.chain().focus().toggleHeading({ level: 2 }).run()
	},
	{
		label: 'Heading 3',
		icon: Heading3Icon,
		handler: editor => editor.chain().focus().toggleHeading({ level: 3 }).run()
	},
	{
		label: 'Heading 4',
		icon: Heading4Icon,
		handler: editor => editor.chain().focus().toggleHeading({ level: 4 }).run()
	},
	{
		label: 'Heading 5',
		icon: Heading5Icon,
		handler: editor => editor.chain().focus().toggleHeading({ level: 5 }).run()
	},
	{
		label: 'Heading 6',
		icon: Heading6Icon,
		handler: editor => editor.chain().focus().toggleHeading({ level: 6 }).run()
	}
] satisfies HeadingType[]

export const MobileHeadingBar = ({
	editor,
	className
}: MobileHeadingBarProps) => {
	const [open, setOpen] = useState<boolean>(false)

	const pickHeading = (headings: HeadingType[]) => {
		let heading
		if (editor.isActive('heading')) {
			switch (editor.isActive('heading')) {
				case editor.isActive('heading', { level: 1 }):
					heading = headings[1]
					return (
						<div className='flex w-full items-center justify-center gap-4'>
							<heading.icon className='h-6 w-6' />
						</div>
					)
				case editor.isActive('heading', { level: 2 }):
					heading = headings[2]
					return (
						<div className='flex w-full items-center justify-center gap-4'>
							<heading.icon className='h-6 w-6' />
						</div>
					)
				case editor.isActive('heading', { level: 3 }):
					heading = headings[3]
					return (
						<div className='flex w-full items-center justify-center gap-4'>
							<heading.icon className='h-6 w-6' />
						</div>
					)
				case editor.isActive('heading', { level: 4 }):
					heading = headings[4]
					return (
						<div className='flex w-full items-center justify-center gap-4'>
							<heading.icon className='h-6 w-6' />
						</div>
					)
				case editor.isActive('heading', { level: 5 }):
					heading = headings[5]
					return (
						<div className='flex w-full items-center justify-center gap-4'>
							<heading.icon className='h-6 w-6' />
						</div>
					)
				case editor.isActive('heading', { level: 6 }):
					heading = headings[6]
					return (
						<div className='flex w-full items-center justify-center gap-4'>
							<heading.icon className='h-6 w-6' />
						</div>
					)
			}
		} else {
			return (
				<div className='flex w-full items-center  justify-center gap-4'>
					<p className='text-lg'>n</p>
				</div>
			)
		}
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
						{
							'is-active':
								editor.isActive('heading') || editor.isActive('paragraph')
						},
						className
					)}
				>
					{pickHeading(headings)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>Heading</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{headings.map(heading => (
						<HeadingMenuItem
							key={heading.label}
							{...heading}
							editor={editor}
						/>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const HeadingMenuItem = ({
	icon: Icon,
	label,
	handler,
	editor
}: HeadingType & {
	editor: Editor
}) => {
	return (
		<DropdownMenuItem
			onClick={() => {
				handler(editor)
			}}
			className='flex cursor-pointer items-center justify-between'
		>
			{typeof Icon === 'string' ? (
				<p className='text-lg'>n</p>
			) : (
				<Icon className='mr-2 h-6 w-6' />
			)}

			<span>{label}</span>
		</DropdownMenuItem>
	)
}
