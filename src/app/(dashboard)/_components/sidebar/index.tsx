'use client'

import { routes } from '@/constant/routes'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Sidebar = () => {
	const pathname = usePathname()

	return (
		<div className='flex flex-col space-y-12'>
			{routes.map(route => {
				const { name, icon: Icon, href } = route

				return (
					<Link
						key={name}
						href={href}
						className={cn(
							'rouneded-e-md mr-6 flex items-center justify-between rounded-r-full bg-gradient-to-r from-transparent to-secondary/50 p-4 shadow-md',
							{ 'bg-primary text-white': href === pathname }
						)}
					>
						<Icon className='h-6 w-6' />
						<p className='text-lg font-semibold'>{name}</p>
					</Link>
				)
			})}
		</div>
	)
}
