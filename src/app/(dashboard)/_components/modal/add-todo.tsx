import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader
} from '@/components/ui/card'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
import { TodoItemSchemaType } from '@/lib/schemas/todo-list'
import { Plus } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { AddTodoCard } from './add-todo-card'

type AddTodo = {
	items: TodoItemSchemaType[]
	setItems: Dispatch<SetStateAction<TodoItemSchemaType[]>>
}

export const AddTodo = ({ items, setItems }: AddTodo) => {
	const onChangeTodo = (
		index: number,
		data: string,
		field: 'title' | 'description'
	) => {
		setItems(items => {
			const newItems = [...items]

			if (field === 'title') {
				newItems[index].title = data
				return newItems
			}

			newItems[index].description = data
			return newItems
		})
	}

	const onAddTodo = () => {
		const item = {
			title: '',
			description: ''
		} satisfies TodoItemSchemaType

		setItems(items => [...items, item])
	}

	const onRemoveTodo = (index: number) => {
		setItems(items => {
			const newItems = [...items]

			newItems.splice(index, 1)

			return newItems
		})
	}

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardDescription>Add todo/task for your todo list</CardDescription>
			</CardHeader>
			<CardContent>
				{items.length === 0 ? (
					<div
						onClick={onAddTodo}
						className='flex w-full cursor-pointer items-center justify-center'
					>
						<Plus />
						<p>Add first todo</p>
					</div>
				) : (
					<div className='flex flex-col items-center gap-2 '>
						<div className='max-h-[10rem] overflow-y-auto py-2'>
							<div className='flex w-full flex-col items-center justify-center space-y-2 '>
								{items.map((item, i) => {
									const { title, description } = item

									return (
										<AddTodoCard
											key={i}
											title={title}
											description={description}
											index={i}
											onChangeTodo={onChangeTodo}
											onRemoveTodo={onRemoveTodo}
										/>
									)
								})}
							</div>
						</div>
						<TooltipProvider delayDuration={100}>
							<Tooltip>
								<TooltipTrigger>
									<Button
										onClick={e => {
											e.preventDefault()

											onAddTodo()
										}}
										variant='ghost'
										disabled={items[items.length - 1].title === ''}
									>
										<Plus />
										<p>Add more</p>
									</Button>
								</TooltipTrigger>
								{items[items.length - 1].title === '' && (
									<TooltipContent side='bottom'>
										<p className='text-foreground/60'>
											Fill a todo title to add more todo.
										</p>
									</TooltipContent>
								)}
							</Tooltip>
						</TooltipProvider>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
