'use client'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CreateTodoListModal } from '../modal/create-todo-list-modal'
import { CreateTodoListPrompt } from './create-todo-list-prompt'

const NoPinnedTodoList = () => {
	return (
		<Dialog>
			<div className='flex h-[25rem] w-full items-center justify-center '>
				<DialogTrigger>
					<CreateTodoListPrompt />
				</DialogTrigger>
			</div>
			<CreateTodoListModal />
		</Dialog>
	)
}

export default NoPinnedTodoList
