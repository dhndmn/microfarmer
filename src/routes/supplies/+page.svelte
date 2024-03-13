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

	$: totalCost = $supplies
		.reduce((sum, item) => sum + (parseInt(item.cost.replace(/[^0-9.-]+/g, '')) || 0), 0)
		.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

	$: datatable = {
		head: ['Date', 'Type', 'Name', 'Quantity', 'Cost'],
		body: tableMapperValues($supplies, ['purchasedAt', 'type', 'name', 'quantity', 'cost']),
		meta: tableMapperValues(data.supplies, [
			'id',
			'purchasedAt',
			'type',
			'name',
			'quantity',
			'cost'
		]),
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

{#if $supplies.length}
	<Table source={datatable} interactive={true} on:selected={handleSelection} />
{:else}
	<p>No supplies have been entered yet.</p>
{/if}
