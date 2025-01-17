import getCurrentUser from './actions/getCurrentUser';
import getListings, { IListingsParams } from './actions/getListings';
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/listings/ListingCard';

interface HomeProps {
	searchParams: IListingsParams & {
		error: string;
	};
}

// searchparams would be empty object ....
export default async function Home({ searchParams }: HomeProps) {
	const listings = await getListings(searchParams);

	const currentUser = await getCurrentUser();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState showReset />
			</ClientOnly>
		);
	}

	if (searchParams.error) {
		return (
			<ClientOnly>
				<EmptyState
					title="Authentication Error"
					subtitle="Am error happened while trying to login/ sign up, please try another email!"
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<Container>
				<div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					{listings.map(listing => (
						<ListingCard
							currentUser={
								currentUser
							}
							key={listing.id}
							data={listing}
						/>
					))}
				</div>
			</Container>
		</ClientOnly>
	);
}
