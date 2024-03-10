// @ts-nocheck
import prisma from '$lib/prisma';

export async function load() {
	const supplies = await prisma.Supply.findMany({
		orderBy: {
			purchasedAt: 'desc'
		},
		where: {
			farmerId: 70
		}
	});

	return {
		supplies
	};
}
