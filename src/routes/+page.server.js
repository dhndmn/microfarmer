// @ts-nocheck
import prisma from '$lib/prisma';

export async function load() {
	const farmers = await prisma.Farmer.findMany({
		orderBy: {
			id: 'asc'
		}
	});

	return {
		farmers
	};
}
