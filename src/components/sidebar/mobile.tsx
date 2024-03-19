'use client'

import { routesMobile } from '@/constant/routes'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const MobileSidebar = () => {
	const pathname = usePathname()

	return (
		<div className='sticky bottom-0 flex w-full items-center justify-evenly bg-gradient-to-t from-secondary to-transparent py-2 backdrop-blur-lg md:hidden'>
			{routesMobile.map(route => {
				const { name, icon: Icon, href } = route

				return (
					<Link
						key={name}
						href={href}
						className={cn(
							'flex flex-col items-center justify-between rounded-md bg-transparent object-contain p-2 sm:w-24',
							{
								'bg-primary': pathname.split('/')[1] === href.split('/')[1]
							}
						)}
					>
						<Icon className='h-6 w-6' />
						<p className='hidden font-semibold sm:block'>{name}</p>
					</Link>
				)
			})}
		</div>
	)
}
