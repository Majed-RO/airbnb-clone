import { create } from 'zustand';

/* 
we used zustand : A small, fast and scalable bearbones state-management solution using simplified flux principles.
*/

interface RentModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useRentModal = create<RentModalStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}));

export default useRentModal;