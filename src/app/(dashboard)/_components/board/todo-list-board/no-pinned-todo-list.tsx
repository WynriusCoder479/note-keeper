'use client'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CreatePrompt } from '../create-prompt'
import { CreateTodoListModal } from '../../modal/create-todo-list-modal'

const NoPinnedTodoList = () => {
	return (
		<Dialog>
			<div className='flex h-[25rem] w-full items-center justify-center '>
				<DialogTrigger>
					<CreatePrompt label='todo lists' />
				</DialogTrigger>
			</div>
			<CreateTodoListModal />
		</Dialog>
	)
}

export default NoPinnedTodoList
