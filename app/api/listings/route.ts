import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();

	const {
		title,
		description,
		category,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		imageSrc,
		price
	} = body;

	// optional
	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			return NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			guestCount,
			roomCount,
			bathroomCount,
			locationValue: location.value,
			price: parseInt(price, 10),
			userId: currentUser.id
		}
	});

	return NextResponse.json(listing);
}
