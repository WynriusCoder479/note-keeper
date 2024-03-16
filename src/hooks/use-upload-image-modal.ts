import { create } from 'zustand'

type UseUploadImageModalStore = {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useUploadImageModal = create<UseUploadImageModalStore>(set => ({
	open: false,
	onOpen: () => set({ open: true }),
	onClose: () => set({ open: false })
}))
