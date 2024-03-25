<script>
	import { harvests, supplies } from '$lib/stores';
	import CostPer from '$lib/components/farm/CostPer.svelte';
	import HarvestStats from '$lib/components/farm/HarvestStats.svelte';
	import TopCrops from '$lib/components/farm/TopCrops.svelte';
</script>

<div class="grid grid-cols-2 gap-4 my-12">
	{#if $harvests.length !== 0 && $supplies.length !== 0}
		<CostPer />
		<HarvestStats />
		<TopCrops />
	{:else if $harvests.length !== 0}
		<TopCrops />
	{:else}
		<span class="col-span-2 text-center"
			>Once you've harvested some crops, you'll see interesting facts here.</span
		>
	{/if}
</div>
