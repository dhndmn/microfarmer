<script>
	// @ts-nocheck
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { harvests } from '$lib/stores';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';
	export let data;

	$harvests = data.harvests.map((harvest) => ({
		...harvest,
		harvestedAt: new Date(harvest.harvestedAt).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		}),
		grams: harvest.quantity.toLocaleString('en-US')
	}));

	$: datatable = {
		// A list of heading labels.
		head: ['Date', 'Crop', 'Tray', 'Grams'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues($harvests, ['harvestedAt', 'crop', 'traySize', 'grams']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(data.harvests, ['id', 'harvestedAt', 'crop', 'traySize', 'grams']),
		// Optional: A list of footer labels.
		foot: ['', '', '', '']
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
				supply: selectedHarvest
			}
		};

		modalStore.trigger(modalUpdate);
	}
</script>

<Table source={datatable} interactive={true} on:selected={handleSelection} />
