import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
	reservationId?: string;
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { reservationId } = params;

	if (!reservationId || typeof reservationId !== 'string') {
		throw new Error('Invalid ID');
	}
  // we use deleteMany bcz we used special query
  // here we allow deletion if the user is the person who made the reservation OR he is the owner of the listing/property
	const reservation = await prisma.reservation.deleteMany({
		where: {
			id: reservationId,
			OR: [
				{ userId: currentUser.id },
				{ listing: { userId: currentUser.id } }
			]
		}
	});

	return NextResponse.json(reservation);
}
