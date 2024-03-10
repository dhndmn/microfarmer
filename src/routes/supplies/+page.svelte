<script>
	import { supplies } from '$lib/stores/supplies.js';
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	export let data;

	$supplies = data.supplies;

	const tempData = [
		{
			id: 1,
			farmerId: 70,
			name: 'Hydrogen',
			cost: 100,
			type: 'H',
			quantity: 10,
			purchasedAt: new Date().toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
		},
		{
			id: 2,
			farmerId: 70,
			name: 'Helium',
			cost: 400,
			type: 'He',
			quantity: 10,
			purchasedAt: new Date().toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
		},
		{
			id: 3,
			farmerId: 70,
			name: 'Lithium',
			cost: 600,
			type: 'Li',
			quantity: 10,
			purchasedAt: new Date().toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
		},
		{
			id: 4,
			farmerId: 70,
			name: 'Beryllium',
			cost: 900,
			type: 'Be',
			quantity: 10,
			purchasedAt: new Date().toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
		},
		{
			id: 5,
			farmerId: 70,
			name: 'Boron',
			cost: 1000,
			type: 'B',
			quantity: 10,
			purchasedAt: new Date().toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			})
		}
	];

	const datatable = {
		// A list of heading labels.
		head: ['Date', 'Name', 'Type', 'Quantity', 'Cost'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues($supplies, ['purchasedAt', 'name', 'type', 'quantity', 'cost']),
		// Optional: A list of footer labels.
		foot: ['[button]', '', '', '[sum]', '[sum]']
	};
</script>

Total spend: ${($supplies.reduce((a, b) => a.cost + b.cost, 0) / 100).toFixed(2)}
<Table source={datatable} />
