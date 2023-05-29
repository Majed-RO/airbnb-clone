import { create } from 'zustand';

/* 
we used zustand : A small, fast and scalable bearbones state-management solution using simplified flux principles.
*/

interface useSearchModalProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useSearchModal = create<useSearchModalProps>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}));

export default useSearchModal;