import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'
import { MobileSidebar } from './_components/sidebar/mobile'

export const metadata = {
	title: 'Dashboard'
} satisfies Metadata

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className='grid h-screen grid-rows-[auto_minmax(0,1fr)] '>
			<div>
				<Navbar />
			</div>
			<div className='grid grid-cols-1 md:grid-cols-[auto_1fr]'>
				<Sidebar />
				<div className='relative flex h-full w-full flex-col overflow-y-auto bg-white bg-grid-black/5 dark:bg-background dark:bg-grid-white/5'>
					<div className='flex-1 '>{children}</div>
					<MobileSidebar />
				</div>
			</div>
		</div>
	)
}

export default DashboardLayout
