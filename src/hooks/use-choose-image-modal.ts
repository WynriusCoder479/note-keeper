import { create } from 'zustand'

type UseChooseImageModalStore = {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useChooseImageModal = create<UseChooseImageModalStore>(set => ({
	open: false,
	onOpen: () => set({ open: true }),
	onClose: () => set({ open: false })
}))
