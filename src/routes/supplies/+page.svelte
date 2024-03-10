<script>
	import { supplies } from '$lib/stores/supplies.js';
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	export let data;

	// $supplies = data.supplies;
	$supplies = data.supplies.map((supply) => ({
		...supply,
		purchasedAt: new Date(supply.purchasedAt).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		}),
		quantity: supply.quantity.toLocaleString('en-US'),
		cost: (supply.cost / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
	}));

	$: totalCost = data.supplies
		.reduce((sum, item) => sum + item.cost / 100, 0)
		.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});

	$: datatable = {
		// A list of heading labels.
		head: ['Date', 'Type', 'Name', 'Quantity', 'Cost'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues($supplies, ['purchasedAt', 'type', 'name', 'quantity', 'cost']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(data.supplies, [
			'id',
			'purchasedAt',
			'type',
			'name',
			'quantity',
			'cost'
		]),
		// Optional: A list of footer labels.
		foot: ['[button]', '', '', '', totalCost]
	};

	function handleSelection(event) {
		const selectedSupply = ['id', 'purchasedAt', 'type', 'name', 'quantity', 'cost'].reduce(
			(obj, key, index) => {
				obj[key] = event.detail[index];
				return obj;
			},
			{}
		);
		console.log(selectedSupply);
	}
</script>

<Table source={datatable} interactive={true} on:selected={handleSelection} />
