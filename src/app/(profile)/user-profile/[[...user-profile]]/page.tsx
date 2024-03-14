'use client'

import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'
import { UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const font = Poppins({ subsets: ['latin'], weight: ['700'] })

const UserProfilePage = () => {
	const { theme } = useTheme()

	return (
		<div className='relative'>
			<div className='absolute z-50 flex w-[255px] flex-col space-y-6 p-4'>
				<div className='flex items-center justify-between'>
					<Link href='/'>
						<ArrowLeft className='h-6 w-6 transition-all duration-200 hover:text-foreground/50' />
					</Link>
					<ThemeToggle />
				</div>
				<h1
					className={cn(
						font.className,
						'bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-center text-3xl font-bold text-transparent dark:to-primary/20'
					)}
				>
					Note Keeper
				</h1>
			</div>
			<UserProfile
				appearance={{
					baseTheme: theme === 'dark' ? dark : undefined,
					elements: {
						card: 'rounded-md',
						navbar: 'border-r-2 border-primary',
						navbarButtons: 'space-y-4 pt-36',
						navbarButton: 'text-xl',
						badge: 'bg-secondary text-primary',
						profileSectionPrimaryButton: 'text-primary hover:bg-secondary/60',
						avatarImageActionsUpload: 'text-primary',
						avatarImageActionsRemove: 'text-red-400',
						formButtonReset: cn(
							buttonVariants({
								variant: 'outline',
								className: 'bg-transparent'
							})
						),
						formButtonPrimary: cn(
							buttonVariants({ variant: 'default', className: 'text-white' })
						),
						breadcrumbsItem: 'text-xl ',
						breadcrumbsItemDivider: 'text-xl'
					}
				}}
			/>
		</div>
	)
}

export default UserProfilePage
