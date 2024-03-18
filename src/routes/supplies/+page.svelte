<script>
	// @ts-nocheck
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { farmerId, supplies } from '$lib/stores';
	import { onMount } from 'svelte';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';

	onMount(async () => {
		const response = await fetch(`/api/supplies?farmerId=${$farmerId}`);
		if (response.ok) {
			const data = await response.json();
			$supplies = data.map((supply) => ({
				...supply,
				purchasedAt: new Date(supply.purchasedAt).toLocaleDateString('en-US', {
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})
			}));
		} else {
			// Handle errors here
		}
	});

	$: totalCost = ($supplies.reduce((sum, item) => sum + (item.cost || 0), 0) / 100).toLocaleString(
		'en-US',
		{ style: 'currency', currency: 'USD' }
	);

	$: datatable = {
		head: ['Date', 'Type', 'Name', 'Quantity', 'Cost'],
		body: tableMapperValues(
			$supplies.map((s) => ({
				...s,
				cost: (s.cost / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
			})),
			['purchasedAt', 'type', 'name', 'quantity', 'cost']
		),
		meta: tableMapperValues(
			$supplies.map((s) => ({
				...s,
				cost: s.cost / 100
			})),
			['id', 'purchasedAt', 'type', 'name', 'quantity', 'cost']
		),
		foot: ['', '', '', '', totalCost]
	};

	const modalStore = getModalStore();

	function handleSelection(event) {
		console.log(event.detail);
		const selectedSupply = event.detail.reduce((obj, value, index) => {
			const keys = ['id', 'purchasedAt', 'type', 'name', 'quantity', 'cost'];
			const key = keys[index];
			if (key === 'cost') {
				value = parseInt(value * 100, 10);
			}
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
	<Table
		source={datatable}
		interactive={true}
		regionFoot="!bg-surface-200-700-token"
		on:selected={handleSelection}
	/>
{:else}
	<p>No supplies have been entered yet.</p>
{/if}
