<script>
	// @ts-nocheck
	export let direction = 'left';
</script>

<button type="button" class="btn-icon btn-icon-sm variant-filled">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-4 h-4"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d={direction === 'left'
				? 'M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
				: direction === 'right'
				? 'M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
				: direction === 'random'
				? 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
				: ''}
		/>
	</svg>
</button>
