<script>
	// @ts-nocheck
	export let harvestGrams;
	export let totalSpending;
</script>

<div class="p-4 card">
	<section class="flex flex-col items-center justify-center p-4">
		<p class="text-5xl font-semibold">
			${Math.floor(totalSpending / (harvestGrams / 453.5924))}<span class="text-lg">/lb</span>
		</p>
	</section>
</div>
