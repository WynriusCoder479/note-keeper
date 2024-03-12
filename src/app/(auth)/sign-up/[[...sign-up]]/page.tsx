'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { Poppins } from 'next/font/google'

const font = Poppins({ subsets: ['latin'], weight: ['800', '900'] })

const SignUpPage = () => {
	const { theme } = useTheme()

	return (
		<SignUp
			appearance={{
				baseTheme: theme === 'dark' ? dark : undefined,
				elements: {
					card: 'lg:bg-transparent lg:shadow-none w-[604px] h-[50rem]',
					headerTitle: cn(
						font.className,
						'text-4xl font-extrabold text-center text-primary pb-12 drop-shadow-lg uppercase'
					),
					headerSubtitle: 'hidden',
					socialButtons: 'space-y-2',
					socialButtonsBlockButton: 'p-4',
					socialButtonsBlockButtonArrow: 'text-primary',
					socialButtonsBlockButtonText:
						'ml-4 text-[1rem] text-primary font-bold',
					dividerLine: 'bg-primary/50',
					dividerText: 'text-xl text-primary',
					formFieldLabel: 'text-xl text-primary',
					formFieldInput:
						'border-emerald-500 focus:outline-none focus:ring-0 text-lg',
					formFieldInputShowPasswordButton:
						'active:outline-none active:ring-0 focus:outline-none focus:ring-0',
					formFieldInputShowPasswordIcon: 'w-6 h-6',
					formButtonPrimary: cn(
						buttonVariants({
							variant: 'default',
							className: 'my-6 text-wheat/50'
						})
					),
					footerAction: 'mx-auto pt-4',
					footerActionText: 'text-lg text-primary',
					footerActionLink: 'text-lg text-primary/50 hover:text-primary/80'
				}
			}}
		/>
	)
}

export default SignUpPage
