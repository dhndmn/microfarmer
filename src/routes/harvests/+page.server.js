// @ts-nocheck
import prisma from '$lib/prisma';

export async function load() {
	const harvests = await prisma.Harvest.findMany({
		orderBy: {
			harvestedAt: 'desc'
		},
		where: {
			farmerId: 103
		}
	});

	return {
		harvests
	};
}
