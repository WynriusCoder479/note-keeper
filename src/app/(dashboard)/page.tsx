import { Tabs, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import NoteBoard from './_components/board/note-board'
import { TabList } from './_components/board/tab-list'
import TodoListBoard from './_components/board/todo-list-board'

type BoardPageProps = {
	searchParams: {
		tab: string | undefined
	}
}

const font = Poppins({ subsets: ['latin'], weight: ['700'] })

export default function BoardPage({ searchParams: { tab } }: BoardPageProps) {
	return (
		<div className='flex w-full flex-col items-center space-y-6 pt-6'>
			<div className='ml-6 mr-auto rounded-lg bg-gradient-to-r from-primary to-primary/50 p-2 shadow-lg'>
				<h2 className={cn(font.className, 'text-4xl font-bold text-white/90')}>
					Board
				</h2>
			</div>

			<Tabs
				defaultValue={!tab ? 'note-board' : tab}
				className='w-[90%]'
			>
				<TabList />
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
