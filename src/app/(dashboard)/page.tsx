import NoteBoard from '@/components/board/note-board'
import { TabList } from '@/components/board/tab-list'
import TodoListBoard from '@/components/board/todo-list-board'
import { Tabs, TabsContent } from '@/components/ui/tabs'

type BoardPageProps = {
	searchParams: {
		tab: string | undefined
	}
}

export default function BoardPage({ searchParams: { tab } }: BoardPageProps) {
	return (
		<div className='flex w-full flex-col items-center space-y-6 pt-6'>
			<Tabs
				defaultValue={!tab ? 'note-board' : tab}
				className='w-[90%]'
			>
				<TabList type='board' />
				<TabsContent value='note-board'>
					<NoteBoard />
				</TabsContent>
				<TabsContent value='todo-board'>
					<TodoListBoard />
				</TabsContent>
			</Tabs>
		</div>
	)
}
