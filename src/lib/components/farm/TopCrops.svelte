<script>
	// @ts-nocheck
	import { harvests, timeSpans } from '$lib/stores';
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';

	const harvestTotals = $harvests
		? (() => {
				const totals = {};

				// Loop through each harvest
				$harvests.forEach((harvest) => {
					const crop = harvest.crop;
					const grams = harvest.grams;

					// If the crop doesn't exist in totals, create it
					if (!totals[crop]) {
						totals[crop] = grams;
					} else {
						// If the crop exists, add grams to its total
						totals[crop] += grams;
					}
				});

				const result = Object.entries(totals)
					.map(([crop, grams]) => ({ crop, grams }))
					.sort((a, b) => b.grams - a.grams);
				return result;
		  })()
		: [];

	let timeSpan = timeSpans[0].span;
	const tableData = {
		head: ['crop', 'grams'],
		body: tableMapperValues(
			harvestTotals.map((harvest) => ({ ...harvest, grams: harvest.grams.toLocaleString() })),
			['crop', 'grams']
		),
		meta: tableMapperValues(
			harvestTotals.map((harvest) => ({ ...harvest, grams: harvest.grams.toLocaleString() })),
			['crop', 'grams']
		)
	};
</script>

<div class="card">
	<header class="relative flex items-center gap-2 text-sm font-semibold card-header">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
			/>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
			/>
		</svg>
		<span class="capitalize">top crops</span>
		<div
			class="absolute top-0 right-0 m-4 capitalize badge variant-soft-surface hover:cursor-pointer"
		>
			{timeSpan}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="w-4 h-4"
			>
				<path
					fill-rule="evenodd"
					d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
					clip-rule="evenodd"
				/>
			</svg>
		</div>
	</header>
	<section class="flex flex-col items-center justify-center p-4">
		<Table source={tableData} />
	</section>
</div>
