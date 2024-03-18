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
	ArrowLeftToLineIcon,
	ArrowRightToLineIcon,
	BetweenHorizonalStartIcon,
	BetweenHorizontalEndIcon,
	BetweenVerticalEndIcon,
	BetweenVerticalStartIcon,
	Columns3Icon,
	LucideIcon,
	RectangleHorizontalIcon,
	Rows3Icon,
	Table2,
	TableCellsMergeIcon,
	TableCellsSplitIcon,
	TableIcon,
	XIcon
} from 'lucide-react'
import { useState } from 'react'

type TableButton = {
	editor: Editor
	className?: string
}

type TableFuncType = {
	label: string
	icon: LucideIcon
	handler: (editor: Editor) => void
}

const tableFuncs = (editor: Editor) => {
	return {
		createTable: {
			label: 'Insert Table',
			icon: TableIcon,
			handler: editor =>
				editor
					.chain()
					.focus()
					.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
					.run()
		} satisfies TableFuncType,
		colunmFuncs: [
			{
				label: 'Add Colunm Before',
				icon: BetweenVerticalStartIcon,
				handler: editor => editor.chain().focus().addColumnBefore().run()
			},
			{
				label: 'Add Colunm After',
				icon: BetweenVerticalEndIcon,
				handler: editor => editor.chain().focus().addColumnAfter().run()
			},
			{
				label: 'Delete Colunm',
				icon: XIcon,
				handler: editor => editor.chain().focus().deleteColumn().run()
			}
		] satisfies TableFuncType[],
		rowFuncs: [
			{
				label: 'Add Row Before',
				icon: BetweenHorizonalStartIcon,
				handler: editor => editor.chain().focus().addRowBefore().run()
			},
			{
				label: 'Add Row After',
				icon: BetweenHorizontalEndIcon,
				handler: editor => editor.chain().focus().addRowAfter().run()
			},
			{
				label: 'Delete Row',
				icon: XIcon,
				handler: editor => editor.chain().focus().deleteRow().run()
			}
		] satisfies TableFuncType[],
		setHeaderFunc: [
			{
				label: 'Toggle Header Colunm',
				icon: Columns3Icon,
				handler: editor => editor.chain().focus().toggleHeaderColumn().run()
			},
			{
				label: 'Toggle Header Row',
				icon: Rows3Icon,
				handler: editor => editor.chain().focus().toggleHeaderRow().run()
			},
			{
				label: 'Toggle Header Cell',
				icon: RectangleHorizontalIcon,
				handler: editor => editor.chain().focus().toggleHeaderCell().run()
			}
		] satisfies TableFuncType[],
		mergeAndSplitCellFunc: [
			{
				label: 'Merge Cells',
				icon: TableCellsMergeIcon,
				handler: editor => editor.chain().focus().mergeCells()
			},
			{
				label: 'Split Cells',
				icon: TableCellsSplitIcon,
				handler: editor => editor.chain().focus().splitCell()
			}
		] satisfies TableFuncType[],
		navigtionFunc: [
			{
				label: 'Go To Next Cell',
				icon: ArrowRightToLineIcon,
				handler: editor => editor.chain().focus().goToNextCell()
			},
			{
				label: 'Go To Previous Cell',
				icon: ArrowLeftToLineIcon,
				handler: editor => editor.chain().focus().goToPreviousCell()
			}
		] satisfies TableFuncType[]
	}
}

export const TableButton = ({ editor, className }: TableButton) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					aria-expanded={open}
					className={cn(
						'flex h-8 w-8 items-center justify-center gap-2 rounded-md p-1',
						'hover:bg-gradient-to-t hover:from-primary/60 hover:to-transparent',
						{
							'is-active': editor.isActive('table')
						},
						className
					)}
				>
					<Table2 className='h-6 w-6' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='h-80 w-64 overflow-y-auto'>
				<DropdownMenuLabel>Table</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					<TableMenuItem
						editor={editor}
						label={tableFuncs(editor).createTable.label}
						icon={tableFuncs(editor).createTable.icon}
						handler={tableFuncs(editor).createTable.handler}
					/>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{tableFuncs(editor).colunmFuncs.map(func => (
						<TableMenuItem
							key={func.label}
							{...func}
							editor={editor}
						/>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Rows</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{tableFuncs(editor).rowFuncs.map(func => (
						<TableMenuItem
							key={func.label}
							{...func}
							editor={editor}
						/>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Headers</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{tableFuncs(editor).setHeaderFunc.map(func => (
						<TableMenuItem
							key={func.label}
							{...func}
							editor={editor}
						/>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Merge & Split</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{tableFuncs(editor).mergeAndSplitCellFunc.map(func => (
						<TableMenuItem
							key={func.label}
							{...func}
							editor={editor}
						/>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Navigation</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className='space-y-2'>
					{tableFuncs(editor).navigtionFunc.map(func => (
						<TableMenuItem
							key={func.label}
							{...func}
							editor={editor}
						/>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export const TableMenuItem = ({
	icon: Icon,
	label,
	handler,

	editor
}: TableFuncType & {
	editor: Editor
}) => {
	return (
		<DropdownMenuItem
			onClick={() => {
				handler(editor)
			}}
			className='flex cursor-pointer items-center justify-between'
		>
			<Icon className='mr-2 h-6 w-6' />
			<span>{label}</span>
		</DropdownMenuItem>
	)
}
