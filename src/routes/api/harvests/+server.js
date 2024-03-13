// @ts-nocheck
import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

// Create
export async function POST({ request }) {
	const newHarvestObject = await request.json();
	const newHarvest = await prisma.harvest.create({
		data: newHarvestObject
	});
	await prisma.$disconnect();
	return json(newHarvest);
}

// Read
export async function GET() {
	const harvest = await prisma.harvest.findMany({
		orderBy: {
			harvestedAt: 'desc'
		}
	});
	await prisma.$disconnect();
	return json(harvest);
}

// Update
export async function PUT({ request }) {
	const { id, crop, harvestedAt, grams, traySize } = await request.json();
	const updatedHarvest = await prisma.harvest.update({
		where: {
			id: id
		},
		data: {
			crop: crop,
			harvestedAt: harvestedAt,
			grams: grams,
			traySize: traySize
		}
	});
	await prisma.$disconnect();
	return json(updatedHarvest);
}

// Delete
export async function DELETE({ request }) {
	const { id } = await request.json();
	await prisma.harvest.delete({
		where: {
			id: id
		}
	});
	await prisma.$disconnect();
	return json(id);
}
