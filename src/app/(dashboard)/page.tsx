import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { ListTodo, Notebook, Split } from 'lucide-react'
import { Poppins } from 'next/font/google'
import NoteBoard from './_components/note-board'
import TodoListBoard from './_components/todo-list-board'
import { TabList } from './_components/tab-list'

const font = Poppins({ subsets: ['latin'], weight: ['700'] })

export default async function Home() {
	return (
		<div className='flex w-full flex-col items-center space-y-6 pt-6'>
			<div className='ml-6 mr-auto rounded-lg bg-gradient-to-r from-primary to-primary/50 p-2 shadow-lg'>
				<h2 className={cn(font.className, 'text-4xl font-bold text-white/90')}>
					Board
				</h2>
			</div>

			<Tabs
				defaultValue='note-board'
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
