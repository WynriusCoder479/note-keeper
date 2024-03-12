import { ThemeToggle } from '@/components/ui/theme-toggle'
import { CustomeUserButton } from './custome-user-button'
import { Logo } from './logo'

export const Navbar = () => {
	return (
		<div className='sticky inset-0 top-0 z-10 mb-4 flex items-center justify-between border-b border-foreground/20 bg-background px-4 py-2 shadow-md'>
			<Logo />
			<div className='flex items-center justify-center space-x-4'>
				<CustomeUserButton />

				<ThemeToggle />
			</div>
		</div>
	)
}
