import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import useLoginModal from './useLoginModal';
import { SafeUser } from '../types';

interface IUseFavorite {
	listingId: string;
	currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const hasFavored = useMemo(() => {
		const list = currentUser?.favoritesIds || [];

		return list.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;
				if (hasFavored) {
					request = () =>
						axios.delete(
							`/api/favorites/${listingId}`
						);
				} else {
					request = () =>
						axios.post(
							`/api/favorites/${listingId}`
						);
				}
				await request();
				router.refresh();
				toast.success('Success');
			} catch (error) {
				toast.error('Something went wrong');
			}
		},
		[currentUser, hasFavored, listingId, loginModal, router]
	);

	return {
		hasFavored,
		toggleFavorite
	};
};

export default useFavorite;
