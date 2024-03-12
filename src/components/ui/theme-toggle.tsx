'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			variant='outline'
			size='icon'
			className='bg-transparent hover:bg-transparent'
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			<Sun className='hidden h-6 w-6 text-primary dark:block' />
			<Moon className='h-6 w-6 text-primary dark:hidden' />
		</Button>
	)
}
