<script>
	// @ts-nocheck
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { farmerId, harvests } from '$lib/stores';
	import { onMount } from 'svelte';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';

	onMount(async () => {
		const response = await fetch(`/api/harvests?farmerId=${$farmerId}`);
		if (response.ok) {
			const data = await response.json();
			$harvests = data.map((harvest) => ({
				...harvest,
				harvestedAt: new Date(harvest.harvestedAt).toLocaleDateString('en-US', {
					month: 'long',
					day: '2-digit',
					year: 'numeric'
				})
			}));
		} else {
			// Handle errors here
		}
	});

	$: totalGrams = $harvests.reduce((sum, item) => sum + item.grams, 0).toLocaleString('en-US');

	$: datatable = {
		head: ['Date', 'Crop', 'Tray', 'Grams'],
		body: tableMapperValues(
			$harvests.map((harvest) => ({ ...harvest, grams: harvest.grams.toLocaleString('en-US') })),
			['harvestedAt', 'crop', 'traySize', 'grams']
		),
		meta: tableMapperValues(
			$harvests.map((harvest) => ({ ...harvest, grams: harvest.grams.toLocaleString('en-US') })),
			['id', 'harvestedAt', 'crop', 'traySize', 'grams']
		),
		foot: ['', '', '', totalGrams]
	};

	const modalStore = getModalStore();

	function handleSelection(event) {
		const selectedHarvest = event.detail.reduce((obj, value, index) => {
			const keys = ['id', 'harvestedAt', 'crop', 'traySize', 'grams'];
			const key = keys[index];
			if (key === 'grams') {
				value = parseInt(value.replace(/,/g, ''), 10);
			}
			obj[key] = value;
			return obj;
		}, {});
		const modalUpdate = {
			type: 'component',
			component: 'harvestsModal',
			meta: {
				action: 'update',
				harvest: selectedHarvest
			}
		};

		modalStore.trigger(modalUpdate);
	}
</script>

{#if $harvests.length}
	<Table
		source={datatable}
		interactive={true}
		regionFoot="!bg-surface-200-700-token"
		on:selected={handleSelection}
	/>
{:else}
	<p>No harvests have been entered yet.</p>
{/if}
