// @ts-nocheck
import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

// Create
export async function POST({ request }) {
	const newSupplyObject = await request.json();
	const newSupply = await prisma.supply.create({
		data: newSupplyObject
	});
	await prisma.$disconnect();
	return json(newSupply);
}

// Read
export async function GET() {
	const supply = await prisma.supply.findMany({
		orderBy: {
			purchasedAt: 'desc'
		}
	});
	await prisma.$disconnect();
	return json(supply);
}

// Update
export async function PUT({ request }) {
	const { id, cost, item, purchasedAt, type } = await request.json();
	const updatedSupply = await prisma.supply.update({
		where: {
			id: id
		},
		data: {
			cost: cost,
			item: item,
			purchasedAt: purchasedAt,
			type: type
		}
	});
	await prisma.$disconnect();
	return json(updatedSupply);
}

// Delete
export async function DELETE({ request }) {
	const { id } = await request.json();
	await prisma.supply.delete({
		where: {
			id: id
		}
	});
	await prisma.$disconnect();
	return json(id);
}
