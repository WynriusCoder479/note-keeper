import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import '@/styles/globals.css'
import { PropsWithChildren } from 'react'
import { site } from '@/constant/site'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/providers/theme'
import { Toaster } from '@/components/ui/sonner'
import { EdgeStoreProvider } from '@/components/providers/edgestore'

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		default: site.name,
		template: `%s | ${site.name}`
	},
	description: site.description,
	icons: {
		icon: {
			url: site.iconPath,
			href: site.iconPath
		}
	}
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<ClerkProvider>
			<html
				lang='en'
				suppressHydrationWarning
			>
				<body className={font.className}>
					<ThemeProvider defaultTheme='dark'>
						<EdgeStoreProvider>{children}</EdgeStoreProvider>
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
