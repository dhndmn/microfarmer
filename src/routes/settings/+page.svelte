<script>
	import { goto } from '$app/navigation';

	async function totalReset() {
		const response = await fetch('/api/settings', {
			method: 'POST',
			body: JSON.stringify({}),
			headers: {
				'content-type': 'application/json'
			}
		});

		try {
			if (response.ok) {
				goto('/');
			} else {
				throw new Error('The server responded with an error.');
			}
		} catch (error) {
			console.error('Total reset failed:', error);
		}
	}
</script>

<button type="button" class="btn variant-filled-warning" on:click={totalReset}>
	<span>
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
				d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
			/>
		</svg>
	</span>
	<span>Start over</span>
</button>
