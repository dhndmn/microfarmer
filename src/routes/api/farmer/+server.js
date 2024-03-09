// @ts-nocheck
import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

// Create
export async function POST({ request }) {
	const newFarmerObject = await request.json();
	const newFarmer = await prisma.farmer.create({
		data: newFarmerObject
	});
	await prisma.$disconnect();
	return json(newFarmer);
}

// Read
export async function GET() {
	const farmer = await prisma.farmer.findMany({
		orderBy: {
			name: 'asc'
		},
		select: {
			id: true,
			name: true
		}
	});
	await prisma.$disconnect();
	return json(farmer);
}

// Update
export async function PUT({ request }) {
	const { id, name, type } = await request.json();
	const updatedFarmer = await prisma.farmer.update({
		where: {
			id: id
		},
		data: {
			name: name,
			farmName: type
		}
	});
	await prisma.$disconnect();
	return json(updatedFarmer);
}

// Delete
export async function DELETE({ request }) {
	const { id } = await request.json();
	await prisma.farmer.delete({
		where: {
			id: id
		}
	});
	await prisma.$disconnect();
	return json(id);
}
