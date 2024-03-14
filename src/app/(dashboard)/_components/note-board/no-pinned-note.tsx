'use client'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CreatePrompt } from '../create-prompt'
import { CreateNoteModal } from '../modal/create-note-modal'

const NoPinnedNote = () => {
	return (
		<Dialog>
			<div className='flex h-[25rem] w-full items-center justify-center '>
				<DialogTrigger>
					<CreatePrompt label='Notes' />
				</DialogTrigger>
			</div>
			<CreateNoteModal />
		</Dialog>
	)
}

export default NoPinnedNote
