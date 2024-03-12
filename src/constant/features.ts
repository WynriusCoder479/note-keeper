import {
	ClipboardListIcon,
	CopyCheckIcon,
	FolderKanbanIcon,
	ImagePlusIcon,
	ListTodoIcon,
	LucideIcon,
	NotebookPenIcon
} from 'lucide-react'

export type Feature = {
	id: number
	description: string
	icon: LucideIcon
}

export const noteFeatures = [
	{
		id: 1,
		description:
			'Create rich text notes with formatting options (bold, italics, lists)',
		icon: NotebookPenIcon
	},
	{
		id: 2,
		description: 'Embed images and videos for visual reference',
		icon: ImagePlusIcon
	},
	{
		id: 3,
		description: 'Organize notes with categories and tags',
		icon: FolderKanbanIcon
	}
] satisfies Feature[]

export const todoListFeature = [
	{
		id: 1,
		description: 'Add tasks with due dates and priorities',
		icon: ClipboardListIcon
	},
	{
		id: 2,
		description: 'Set recurring tasks to stay on top of routines',
		icon: CopyCheckIcon
	},
	{
		id: 3,
		description: 'Mark tasks complete for a sense of accomplishment',
		icon: ListTodoIcon
	}
] satisfies Feature[]
