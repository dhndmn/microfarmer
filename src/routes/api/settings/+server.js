import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export async function POST() {
	const delete_farmer = prisma.farmer.deleteMany();

	await prisma.$transaction([delete_farmer]);

	await prisma.$disconnect();
	return json('All data deleted');
}
