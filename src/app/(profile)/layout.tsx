import { PropsWithChildren } from 'react'

const ProfileLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className=' relative flex w-full items-center justify-center bg-white py-12 bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]'>
			<div className='pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black'></div>
			{children}
		</div>
	)
}

export default ProfileLayout
