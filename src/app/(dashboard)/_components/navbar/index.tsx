'use client'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { CustomeUserButton } from './custome-user-button'
import { Logo } from './logo'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useSideBar } from '@/hooks/use-sidebar'

export const Navbar = () => {
	const { open, onClose, onOpen } = useSideBar()

	const onClick = () => (open ? onClose() : onOpen())

	return (
		<div className='sticky inset-0 top-0 z-10 flex items-center justify-between border-b border-foreground/20 bg-background px-4 py-2 shadow-md'>
			<div className='flex items-center justify-center gap-4'>
				<Button
					variant='ghost'
					size='icon'
					onClick={onClick}
				>
					<Menu className='h-7 w-7' />
				</Button>
				<Logo />
			</div>
			<div className='flex items-center justify-center space-x-4'>
				<CustomeUserButton />

				<ThemeToggle />
			</div>
		</div>
	)
}
