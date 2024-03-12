<script>
	// @ts-nocheck
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { supplies } from '$lib/stores';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	export let data;

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
		foot: ['', '', '', '', totalCost]
	};

	const modalStore = getModalStore();

	function handleSelection(event) {
		console.log(event.detail);
		const selectedSupply = event.detail.reduce((obj, value, index) => {
			const key = ['id', 'purchasedAt', 'type', 'name', 'quantity', 'cost'][index];
			obj[key] = value;
			return obj;
		}, {});
		const modalUpdate = {
			type: 'component',
			component: 'suppliesModal',
			meta: {
				action: 'update',
				supply: selectedSupply
			}
		};

		modalStore.trigger(modalUpdate);
	}
</script>

<Table source={datatable} interactive={true} on:selected={handleSelection} />
