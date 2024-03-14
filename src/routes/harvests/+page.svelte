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
					day: 'numeric',
					year: 'numeric'
				}),
				grams: harvest.grams.toLocaleString('en-US')
			}));
		} else {
			// Handle errors here
		}
	});

	$: totalGrams = $harvests
		.reduce((sum, item) => sum + parseInt(item.grams.replace(/,/g, ''), 10), 0)
		.toLocaleString('en-US');

	$: datatable = {
		head: ['Date', 'Crop', 'Tray', 'Grams'],
		body: tableMapperValues($harvests, ['harvestedAt', 'crop', 'traySize', 'grams']),
		meta: tableMapperValues($harvests, ['id', 'harvestedAt', 'crop', 'traySize', 'grams']),
		foot: ['', '', '', totalGrams]
	};

	const modalStore = getModalStore();

	function handleSelection(event) {
		console.log(event.detail);
		const selectedHarvest = event.detail.reduce((obj, value, index) => {
			const key = ['id', 'harvestedAt', 'crop', 'traySize', 'grams'][index];
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
	<Table source={datatable} interactive={true} on:selected={handleSelection} />
{:else}
	<p>No harvests have been entered yet.</p>
{/if}
