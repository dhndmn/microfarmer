<script>
	import { farmerName, harvests, supplies } from '$lib/stores';
	import CostPer from '$lib/components/farm/CostPer.svelte';
	import HarvestStats from '$lib/components/farm/HarvestStats.svelte';
	import TopCrops from '$lib/components/farm/TopCrops.svelte';
	const getDayTime = () => {
		const hour = new Date().getHours();
		if (hour < 12) return 'morning';
		if (hour < 18) return 'afternoon';
		return 'evening';
	};
	const dayTime = getDayTime();
</script>

<p>Good {dayTime}, farmer {$farmerName}!</p>

{#if $harvests && $supplies}
	<div class="grid grid-cols-2 gap-4 my-12">
		<CostPer />
		<HarvestStats />
		<TopCrops />
	</div>
{:else}
	<div class="gap-4 my-12 text-center">
		Once you've harvested some crops, you'll see interesting facts here.
	</div>
{/if}
