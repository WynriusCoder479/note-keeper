import Image from 'next/image'

export const Brading = () => {
	return (
		<>
			<div className='relative z-50 flex cursor-pointer flex-col items-center justify-center space-y-4'>
				<div className='rounded-full shadow-lg'>
					<Image
						src='/note-keeper-logo.png'
						alt='logo'
						width={450}
						height={450}
						className='h-52 w-52'
					/>
				</div>
				<h1 className='relative z-50 bg-gradient-to-r from-black/80 to-emerald-700 bg-clip-text text-4xl font-black uppercase text-transparent dark:from-primary dark:to-white/50'>
					Note Keeper
				</h1>
			</div>
			<div className='mt-2  h-1 w-1/2  bg-gradient-to-r from-black/80 to-emerald-700 dark:from-primary dark:to-white/50' />
		</>
	)
}
