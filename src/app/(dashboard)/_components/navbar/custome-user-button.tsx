'use client'

import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export const CustomeUserButton = () => {
	const { theme } = useTheme()

	return (
		<UserButton
			userProfileMode='navigation'
			userProfileUrl='/user-profile'
			appearance={{
				baseTheme: theme === 'dark' ? dark : undefined,
				elements: {
					userButtonAvatarBox: 'border-2 border-primary',
					userButtonTrigger: 'focus:outline-none focus:ring-0 ',
					userButtonPopoverCard:
						'w-fit bg-background rounded-md border-2 border-foreground/20'
				}
			}}
		/>
	)
}
