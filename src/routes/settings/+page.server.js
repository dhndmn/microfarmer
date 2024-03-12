// @ts-nocheck
import prisma from '$lib/prisma';

export async function load() {
	const supplyTypes = await prisma.Supply.findMany({
		select: {
			type: true
		},
		orderBy: {
			type: 'asc'
		},
		where: {
			type: {
				not: null
			},
			farmerId: 102
		}
	});

	return {
		supplyTypes
	};
}
