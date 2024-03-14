import { Plus } from 'lucide-react'

export const CreateTodoListPrompt = () => {
	return (
		<div className='flex w-[450px] cursor-pointer flex-col items-center justify-center space-y-6 rounded-lg border-2 border-dashed border-primary p-4'>
			<h3 className='text-center text-2xl font-extrabold tracking-wider'>
				You don&apos;t have any pinned{' '}
				<span className='text-primary'>Todo lists</span>.
			</h3>
			<div className='flex items-center justify-center gap-2'>
				<Plus className='h-4 w-4' />
				<p className='leading-nonw text-lg font-semibold'>
					Create <span className='text-primary'>Todo Lists</span>
				</p>
			</div>
		</div>
	)
}
