import { Meteors } from '@/components/ui/meteors'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { PropsWithChildren } from 'react'
import { Brading } from './_component/branding'
import { Features } from './_component/features'
import { Quote } from './_component/quote'

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex h-full w-full items-center justify-center bg-white dark:bg-black '>
			<div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black'></div>
			<div className='flex h-[50rem] w-[1208px] overflow-hidden rounded-lg '>
				<div className='bg-radial-at-t relative hidden w-1/2 from-primary via-primary/50 to-transparent lg:block'>
					<div className='absolute bottom-2 right-2 z-50'>
						<ThemeToggle />
					</div>

					<Meteors number={20} />

					<div className='flex h-full w-full flex-col items-center justify-start py-12'>
						<Brading />
						<Quote />
						<Features />
					</div>
					<div className='absolute bottom-2 flex w-full items-center justify-center'>
						<p className='text-foreground/50'>
							{'<'}Wyns{'/>'}
						</p>
					</div>
				</div>
				<div className=' flex w-full flex-1 items-center justify-center lg:items-start lg:bg-secondary/80'>
					{children}
				</div>
			</div>
		</div>
	)
}

export default AuthLayout
