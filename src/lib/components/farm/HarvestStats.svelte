<script>
	// @ts-nocheck
	import { harvests, unitConversions, timeSpans } from '$lib/stores';

	const harvestGrams = $harvests.reduce((total, harvest) => total + harvest.grams, 0);
	let timeSpan = timeSpans[0].span;
	let unit = 'g';

	function animalMath(harvestGrams) {
		const animals = [
			{ alpaca: { grams: 75000 } },
			{ chicken: { grams: 1500 } },
			{ cat: { grams: 5000 } },
			{ cow: { grams: 700000 } },
			{ dog: { grams: 25000 } },
			{ donkey: { grams: 400000 } },
			{ duck: { grams: 1500 } },
			{ gerbil: { grams: 100 } },
			{ goat: { grams: 45000 } },
			{ gopher: { grams: 400 } },
			{ horse: { grams: 600000 } },
			{ llama: { grams: 150000 } },
			{ pig: { grams: 75000 } },
			{ rabbit: { grams: 2000 } },
			{ snail: { grams: 25 } },
			{ squirrel: { grams: 250 } },
			{ turkey: { grams: 8000 } },
			{ wombat: { grams: 75 } }
		];
		const randomAnimalIndex = Math.floor(Math.random() * animals.length);
		const animal = Object.keys(animals[randomAnimalIndex])[0];
		const animalGrams = animals[randomAnimalIndex][animal].grams;
		const equivalentAnimals = (harvestGrams / animalGrams).toLocaleString(undefined, {
			minimumFractionDigits: 0,
			maximumFractionDigits: 1
		});
		return `that's ${equivalentAnimals} ${animal}s`;
	}
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
				d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"
			/>
		</svg>
		<span class="capitalize">harvested</span>
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
		<p class="text-5xl font-semibold">
			<span class="flex items-center gap-2"
				>{Math.floor(harvestGrams).toLocaleString()}
				<span class="flex items-center badge variant-soft-surface hover:cursor-pointer"
					>{unit}<svg
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
					</svg></span
				></span
			>
		</p>
		<p class="my-2 text-sm italic">({animalMath(harvestGrams)})</p>
	</section>
</div>
