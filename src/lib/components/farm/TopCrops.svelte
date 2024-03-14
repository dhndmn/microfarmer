<script>
	// @ts-nocheck
	import { Table, tableMapperValues } from '@skeletonlabs/skeleton';

	const sourceData = [
		{ crop: 'Broccoli', icon: '🥦', totalGrams: 10079, averageGrams: 100 },
		{ crop: 'Buckwheat', icon: '🌾', totalGrams: 40026, averageGrams: 400 },
		{ crop: 'Radish', icon: '🥕', totalGrams: 6941, averageGrams: 694 }
	];

	const tableSimple = {
		head: ['', 'Crop', 'g', 'avg'],
		body: tableMapperValues(sourceData, ['icon', 'crop', 'totalGrams', 'averageGrams']),
		meta: tableMapperValues(sourceData, ['icon', 'crop', 'totalGrams', 'averageGrams'])
	};
</script>

<div class="p-4 card">
	<section class="flex flex-col items-center justify-center p-4">
		<Table source={tableSimple} />
	</section>
</div>
