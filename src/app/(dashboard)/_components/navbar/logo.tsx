import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Image from 'next/image'

const font = Poppins({ subsets: ['latin'], weight: ['700'] })

export const Logo = () => {
	return (
		<div className='flex items-center justify-center space-x-2'>
			<div className='overflow-hidden rounded-full shadow-md'>
				<Image
					src='/note-keeper-logo.png'
					alt='logo'
					width={200}
					height={200}
					className='h-10 w-10'
				/>
			</div>
			<h2
				className={cn(
					font.className,
					'hidden bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-2xl font-bold text-transparent dark:to-emerald-200 md:block'
				)}
			>
				Note Keeper
			</h2>
		</div>
	)
}
