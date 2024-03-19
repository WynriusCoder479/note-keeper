import NoteStore from '@/components/archive/note-store'
import TodoListStore from '@/components/archive/todo-list-store'
import { TabList } from '@/components/board/tab-list'
import { Tabs, TabsContent } from '@/components/ui/tabs'

type ArchivePageProps = {
	searchParams: {
		tab: string | undefined
	}
}

const ArchivePage = ({ searchParams: { tab } }: ArchivePageProps) => {
	return (
		<div className='flex w-full flex-col items-center space-y-6 pt-6'>
			<Tabs
				defaultValue={!tab ? 'note-board' : tab}
				className='w-[90%]'
			>
				<TabList type='archive' />
				<TabsContent value='note-board'>
					<NoteStore />
				</TabsContent>
				<TabsContent value='todo-board'>
					<TodoListStore />
				</TabsContent>
			</Tabs>
		</div>
	)
}

export default ArchivePage
