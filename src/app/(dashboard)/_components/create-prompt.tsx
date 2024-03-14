'use client'

import { Plus } from 'lucide-react'

type CreatePromptProps = {
	label: string
}

export const CreatePrompt = ({ label }: CreatePromptProps) => {
	const uppercaseFirstLetter = (str: string) => {
		return str
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}

	return (
		<div className='flex w-[450px] cursor-pointer flex-col items-center justify-center space-y-6 rounded-lg border-2 border-dashed border-primary p-4'>
			<h3 className='text-center text-2xl font-extrabold tracking-wider'>
				You don&apos;t have any pinned{' '}
				<span className='text-primary'>{uppercaseFirstLetter(label)}</span>.
			</h3>
			<div className='flex items-center justify-center gap-2'>
				<Plus className='h-4 w-4' />
				<p className='leading-nonw text-lg font-semibold'>
					Create{' '}
					<span className='text-primary'>{uppercaseFirstLetter(label)}</span>
				</p>
			</div>
		</div>
	)
}
