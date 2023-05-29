import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
}

export default async function getListings({
	userId,
	guestCount,
	roomCount,
	bathroomCount,
	startDate,
	endDate,
	locationValue,
	category
}: IListingsParams) {
	try {
		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		if (guestCount) {
			// gte = greater then or equal
			// + to convert value to number
			query.guestCount = {
				gte: +guestCount
			};
		}

		if (roomCount) {
			query.roomCount = {
				gte: +roomCount
			};
		}

		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount
			};
		}

		if (locationValue) {
			query.locationValue = locationValue;
		}

    if(category) {
      query.category = category;
    }

		if (startDate && endDate) {
			// to exclude reserved dates of all reservations of listings -- in other words, to get all available dates of listings
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								startDate: {
									lte: startDate
								},
								endDate: {
									gte: startDate
								}
							},
							{
								startDate: {
									lte: endDate
								},
								endDate: {
									gte: endDate
								}
							}
						]
					}
				}
			};
		}

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc'
			}
		});

		// return listings;
		const safeListings = listings.map(listing => ({
			...listing,
			createdAt: listing.createdAt.toISOString()
		}));

		return safeListings;
	} catch (error: any) {
		throw new Error(error);
	}
}
