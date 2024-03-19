import {
	ArchiveIcon,
	HistoryIcon,
	ListTodoIcon,
	LucideIcon,
	NotebookIcon,
	SquareKanbanIcon
} from 'lucide-react'

export type Route = {
	name: string
	icon: LucideIcon
	href: string
}

export const routes = [
	{
		name: 'Board',
		icon: SquareKanbanIcon,
		href: '/'
	},
	{
		name: 'Notes',
		icon: NotebookIcon,
		href: '/notes'
	},
	{
		name: 'Todo lists',
		icon: ListTodoIcon,
		href: '/todo-lists'
	},

	{
		name: 'Archive',
		icon: ArchiveIcon,
		href: '/archive'
	}
] satisfies Route[]

export const routesMobile = [
	{
		name: 'Notes',
		icon: NotebookIcon,
		href: '/notes'
	},
	{
		name: 'Todo lists',
		icon: ListTodoIcon,
		href: '/todo-lists'
	},
	{
		name: 'Board',
		icon: SquareKanbanIcon,
		href: '/'
	},
	{
		name: 'Archive',
		icon: ArchiveIcon,
		href: '/archive'
	}
] satisfies Route[]
