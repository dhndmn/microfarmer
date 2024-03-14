<script>
	import { farmerName, harvests, supplies } from '$lib/stores';
	import CostPer from '$lib/components/farm/CostPer.svelte';
	import HarvestSummary from '$lib/components/farm/HarvestSummary.svelte';
	import TopCrops from '$lib/components/farm/TopCrops.svelte';
	const getDayTime = () => {
		const hour = new Date().getHours();
		if (hour < 12) return 'morning';
		if (hour < 18) return 'afternoon';
		return 'evening';
	};
	const dayTime = getDayTime();
	const harvestGrams = $harvests.reduce((total, harvest) => total + harvest.grams, 0);
	const totalSpending = $supplies.reduce((total, supply) => total + supply.price, 0);
</script>

<p>Good {dayTime}, farmer {$farmerName}!</p>

<div class="grid grid-cols-1 gap-4 my-12">
	<CostPer harvestGrams totalSpending />
	<HarvestSummary harvestGrams />
	<TopCrops />
</div>
