'use client'

import { PropsWithChildren } from 'react'
import { EdgeStoreProvider as Provider } from '@/lib/edgestore'

export const EdgeStoreProvider = ({ children }: PropsWithChildren) => {
	return <Provider>{children}</Provider>
}
