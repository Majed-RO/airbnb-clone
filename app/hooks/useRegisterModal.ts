import { create } from 'zustand';

/* 
we used zustand : A small, fast and scalable bearbones state-management solution using simplified flux principles.
*/

interface RegisterModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false })
}));

export default useRegisterModal;