import { Metadata } from 'next'
import React, { PropsWithChildren } from 'react'
import { Navbar } from './_components/navbar'

export const metadata = {
	title: 'Dashboard'
} satisfies Metadata

const DashboardLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default DashboardLayout
