// @ts-nocheck
import prisma from '$lib/prisma';

export async function load() {
	const data = await prisma.Farmer.findUnique({
        where: {
            id: 1
        }
	});

	return {
		data
	};
}
