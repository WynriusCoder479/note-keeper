'use client'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CreateNoteModal } from '../modal/create-note-modal'
import { CreateNotePrompt } from './create-note-prompt'

const NoPinnedNote = () => {
	return (
		<Dialog>
			<div className='flex h-[25rem] w-full items-center justify-center '>
				<DialogTrigger>
					<CreateNotePrompt />
				</DialogTrigger>
			</div>
			<CreateNoteModal />
		</Dialog>
	)
}

export default NoPinnedNote
