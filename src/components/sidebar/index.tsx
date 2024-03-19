'use client'

import { routes } from '@/constant/routes'
import { useSideBar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Sidebar = () => {
	const pathname = usePathname()
	const { open } = useSideBar()

	return (
		<div
			className={cn(
				'hidden w-[12rem] border-r border-secondary/80 bg-background pt-12 md:block',
				open ? '' : 'w-0'
			)}
		>
			<div className='flex flex-col space-y-12'>
				{routes.map(route => {
					const { name, icon: Icon, href } = route

					return (
						<Link
							key={name}
							href={href}
							className={cn(
								'rouneded-e-md mr-6 flex items-center justify-between rounded-r-full bg-gradient-to-r from-transparent to-secondary/50 p-4 shadow-md',
								{
									'bg-primary text-white':
										href.split('/')[1] === pathname.split('/')[1],
									'bg-transparent': !open
								}
							)}
						>
							<Icon className='h-6 w-6' />
							<p className='text-lg font-semibold'>{name}</p>
						</Link>
					)
				})}
			</div>
		</div>
	)
}
