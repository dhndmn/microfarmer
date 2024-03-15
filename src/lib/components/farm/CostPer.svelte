<script>
	// @ts-nocheck
	import { harvests, supplies, timeSpans, unitConversions } from '$lib/stores';

	let timeSpan = timeSpans[0].span;
	let unit = 'pound';

	$: costPerPound =
		$harvests && $supplies
			? $supplies.reduce((total, supply) => total + supply.cost, 0) /
			  100 /
			  ($harvests.reduce((total, harvest) => total + harvest.grams, 0) *
					unitConversions[0].toPound)
			: 0;
</script>

<div class="flex flex-col justify-center h-full card">
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
				d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
			/>
		</svg>
		<span class="capitalize"
			>cost per <span class="badge variant-soft-surface hover:cursor-pointer"
				>{unit}
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
			</span></span
		>
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
	<section class="flex items-center justify-center flex-grow p-4">
		<p class="text-5xl font-semibold">
			{costPerPound.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
		</p>
	</section>
</div>
