import { create } from 'zustand'

type UseSideBarStore = {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useSideBar = create<UseSideBarStore>(set => ({
	open: true,
	onOpen: () => set({ open: true }),
	onClose: () => set({ open: false })
}))
