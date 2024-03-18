import { create } from 'zustand'

type UseAddLinkModalStore = {
	open: boolean
	onOpen: () => void
	onClose: () => void
}

export const useAddLinkModal = create<UseAddLinkModalStore>(set => ({
	open: false,
	onOpen: () => set({ open: true }),
	onClose: () => set({ open: false })
}))
