import { localStorageStore } from '@skeletonlabs/skeleton';
export const prefix = 'mf';

// Farm stores
export const avatar = localStorageStore(`${prefix}-farm-name`, {
	gender: 1,
	skin: 1,
	hair: 1,
	shirt: 1,
	pants: 1
});
export const established = localStorageStore(`${prefix}-established`, '');
export const farmerId = localStorageStore(`${prefix}-farmer-id`, '');
export const farmerName = localStorageStore(`${prefix}-farmer-name`, '');
export const farmName = localStorageStore(`${prefix}-farm-name`, '');

// Harvest stores
export const harvests = localStorageStore(`${prefix}-harvests`, []);
export const traySizes = localStorageStore(`${prefix}-tray-sizes`, ['1020', '520', 'mini']);

// Supply stores
export const supplies = localStorageStore(`${prefix}-supplies`, []);
export const supplyTypes = localStorageStore(`${prefix}-supplies`, ['seeds', 'soil', 'trays']);

// Miscellaneous stores
const getDayTime = () => {
	const hour = new Date().getHours();
	if (hour < 12) return 'morning';
	if (hour < 18) return 'afternoon';
	return 'evening';
};
export const dayTime = getDayTime();
export const unitConversions = [
	{ unit: 'gram', shorthand: 'g', toPound: 0.00220462, toKilogram: 0.001 },
	{ unit: 'pound', shorthand: 'lb', toKilogram: 0.453592, toGram: 453.592 },
	{ unit: 'kilogram', shorthand: 'kg', toPound: 2.20462, toGram: 1000 }
];

export const timeSpans = [
	{
		span: 'all time',
		startDate: new Date(0).toISOString(),
		endDate: new Date().toISOString()
	},
	{
		span: 'this week',
		startDate: new Date(
			new Date().setHours(0, 0, 0, 0) - new Date().getDay() * 24 * 60 * 60 * 1000
		).toISOString(),
		endDate: new Date().toISOString()
	},
	{
		span: 'last week',
		startDate: new Date(
			new Date().setHours(0, 0, 0, 0) - (new Date().getDay() + 6) * 24 * 60 * 60 * 1000
		).toISOString(),
		endDate: new Date(
			new Date().setHours(23, 59, 59, 999) - new Date().getDay() * 24 * 60 * 60 * 1000
		).toISOString()
	},
	{
		span: 'this month',
		startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString(),
		endDate: new Date().toISOString()
	},
	{
		span: 'last month',
		startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString(),
		endDate: new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			0,
			23,
			59,
			59,
			999
		).toISOString()
	},
	{
		span: 'this year',
		startDate: new Date(new Date().getFullYear(), 0, 1).toISOString(),
		endDate: new Date().toISOString()
	}
];
