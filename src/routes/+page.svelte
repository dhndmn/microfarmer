<script>
	// @ts-nocheck
	import { getModalStore } from '@skeletonlabs/skeleton';
	import FarmerCard from '$lib/components/FarmerCard.svelte';
	export let data;

	const modalStore = getModalStore();

	const modalCreate = {
		type: 'component',
		component: 'farmerModal'
	};
</script>

<div class="flex flex-col items-center justify-center h-screen gap-12">
	<h1
		class="text-6xl text-transparent uppercase h1 bg-gradient-to-t from-green-700 to-green-300 bg-clip-text box-decoration-clone"
	>
		<span
			class="text-5xl font-thin text-transparent lowercase bg-gradient-to-t from-red-700 to-red-300 bg-clip-text box-decoration-clone"
			>micro</span
		>Farmer
	</h1>
	<div class="grid grid-flow-col gap-8">
		{#if data.farmers.length > 0}
			<FarmerCard
				farmer={data.farmers[0].name}
				farm={data.farmers[0].farmName}
				id={data.farmers[0].id}
			/>
		{:else}
			<button
				type="button"
				class="btn btn-xl variant-filled"
				on:click={() => modalStore.trigger(modalCreate)}
			>
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
							d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
						/>
					</svg>
				</span>
				<span>New</span>
			</button>
		{/if}
	</div>
</div>
