import { ArchiveX } from 'lucide-react'

type NoStoreItemProps = {
	type: 'note' | 'todo list'
}

export const NoStoreItem = ({ type = 'note' }: NoStoreItemProps) => {
	return (
		<div className='w-fill flex h-[350px] items-center justify-center gap-2'>
			<div className='flex w-fit flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-foreground p-6'>
				<ArchiveX className='h-12 w-12' />
				<p className='text-xl font-semibold tracking-wider'>No {type} store</p>
			</div>
		</div>
	)
}
