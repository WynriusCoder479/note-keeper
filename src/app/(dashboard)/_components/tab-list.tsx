import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListTodo, Notebook, Split } from 'lucide-react'
import Link from 'next/link'

export const TabList = () => {
	return (
		<TabsList className='mb-4 grid h-fit w-full grid-cols-[1fr_auto_1fr] space-x-2 p-1.5'>
			<TabsTrigger
				value='note-board'
				asChild
				className='data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/50 data-[state=active]:text-white/80'
			>
				<Link
					href='/?tab=note-board'
					className='flex items-center justify-start gap-2'
				>
					<Notebook className='h-5 w-5' />
					<p className='text-lg tracking-wider '>Note board</p>
				</Link>
			</TabsTrigger>
			<Split className='h-6 w-6 text-foreground/50' />
			<TabsTrigger
				value='todo-board'
				asChild
				className='data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/50 data-[state=active]:text-white/80'
			>
				<Link
					href='/?tab=todo-list-board'
					className='flex items-center justify-start gap-2'
				>
					<ListTodo className=' h-5 w-5' />
					<p className='text-lg tracking-wider '>Todo list board</p>
				</Link>
			</TabsTrigger>
		</TabsList>
	)
}
