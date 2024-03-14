<script>
	// @ts-nocheck
	export let harvestGrams;

	function animalMath(harvestGrams) {
		const animals = [
			{ gerbil: { grams: 100 } },
			{ gopher: { grams: 400 } },
			{ snail: { grams: 25 } },
			{ squirrel: { grams: 250 } },
			{ wombat: { grams: 75 } }
		];
		const randomAnimalIndex = Math.floor(Math.random() * animals.length);
		const animal = Object.keys(animals[randomAnimalIndex])[0];
		const animalGrams = animals[randomAnimalIndex][animal].grams;
		const equivalentAnimals = (harvestGrams / animalGrams).toFixed(1);
		return `or ${equivalentAnimals} ${animal}s`;
	}
</script>

<div class="p-4 card">
	<section class="flex flex-col items-center justify-center p-4">
		<p class="text-5xl font-semibold">
			{Math.floor(harvestGrams / 1000)}
		</p>
		<p>kilograms</p>
		<p>harvested</p>
		<p class="my-2 text-sm italic">({animalMath(harvestGrams)})</p>
	</section>
</div>
