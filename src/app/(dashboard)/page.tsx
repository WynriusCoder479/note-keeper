import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { ListTodo, Notebook, Split } from 'lucide-react'
import { Poppins } from 'next/font/google'
import NoteBoard from './_components/note-board'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import TodoListBoard from './_components/todo-list-board'

const font = Poppins({ subsets: ['latin'], weight: ['700'] })

const findPinnedResource = async (userId: string) => {
	const notesPinnedBoard = await db.note.findMany({
		where: {
			userId,
			isPin: true
		}
	})

	const todoListsPinnedBoard = await db.todoList.findMany({
		where: {
			userId,
			isPin: true
		}
	})

	return { notesPinnedBoard, todoListsPinnedBoard }
}

export default async function Home() {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const { notesPinnedBoard, todoListsPinnedBoard } =
		await findPinnedResource(userId)

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
				<TabsList className='mb-4 grid h-fit w-full grid-cols-[1fr_auto_1fr] space-x-2 p-1.5'>
					<TabsTrigger
						value='note-board'
						className={cn(
							'flex items-center justify-start gap-2',
							'data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/50 data-[state=active]:text-white/80'
						)}
					>
						<Notebook className='h-5 w-5' />
						<p className='text-lg tracking-wider '>Note board</p>
					</TabsTrigger>
					<Split className='h-6 w-6 text-foreground/50' />
					<TabsTrigger
						value='todo-board'
						className={cn(
							'flex items-center justify-start gap-2',
							'data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/50 data-[state=active]:text-white/80'
						)}
					>
						<ListTodo className=' h-5 w-5' />
						<p className='text-lg tracking-wider '>Todo list board</p>
					</TabsTrigger>
				</TabsList>
				<TabsContent value='note-board'>
					<NoteBoard notes={notesPinnedBoard} />
				</TabsContent>
				<TabsContent value='todo-board'>
					<TodoListBoard todoLists={todoListsPinnedBoard} />
				</TabsContent>
			</Tabs>
		</div>
	)
}
