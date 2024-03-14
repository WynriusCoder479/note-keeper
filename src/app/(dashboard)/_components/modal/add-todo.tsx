import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TodoItemSchemaType } from '@/lib/schemas/todo-list'
import { Plus, Trash } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

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
							<div className='flex w-full flex-col items-center justify-center space-y-2 px-3'>
								{items.map((item, i) => {
									const { title, description } = item

									return (
										<div
											key={i}
											className='flex w-full items-center space-x-2'
										>
											<p>{i + 1}:</p>
											<Input
												className='w-1/3'
												value={title}
												placeholder='e.g Title'
												onChange={e =>
													onChangeTodo(i, e.currentTarget.value, 'title')
												}
											/>
											<Input
												value={description}
												placeholder='e.g Descriptiom'
												onChange={e =>
													onChangeTodo(i, e.currentTarget.value, 'description')
												}
											/>
											<Button
												variant='destructive'
												size='sm'
												onClick={e => {
													e.preventDefault()
													onRemoveTodo(i)
												}}
											>
												<Trash className='h-4 w-4' />
											</Button>
										</div>
									)
								})}
							</div>
						</div>
						<div
							onClick={onAddTodo}
							className='mt-4 flex cursor-pointer items-center'
						>
							<Plus />
							<p>Add more</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
