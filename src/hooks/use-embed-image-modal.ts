import { create } from 'zustand'

type UseEmbedImageModalStore = {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useEmbedImageModal = create<UseEmbedImageModalStore>(set => ({
	open: false,
	onOpen: () => set({ open: true }),
	onClose: () => set({ open: false })
}))
