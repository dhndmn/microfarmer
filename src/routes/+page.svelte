<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { farmName, farmerName } from '$lib/stores/farmer';
	import FarmerCard from '$lib/components/FarmerCard.svelte';
	export let data;
	console.log(data.farmers);

	const modalStore = getModalStore();
	const farmerCards = data.farmers.map((farmer) => ({
		component: FarmerCard,
		props: {
			farmerName: farmer.name,
			farmName: farmer.farmName
		}
	}));
	const modalNew = {
		type: 'prompt',
		title: '',
		body: 'Farmer Name',
		value: '',
		valueAttr: { type: 'text', minlength: 1, maxlength: 30, required: true },
		buttonTextSubmit: 'Ok',
		response: (r) => r && createFarmer(r)
	};
	const modalOpen = {
		type: 'alert',
		title: '',
		body: farmerCards,
		buttonTextCancel: 'Back',
		response: (r) => r && loadFarmer(r)
	};

	async function createFarmer(name) {
		let newFarmerResponse;
		const newFarmer = {
			name: name,
			farmName: name
		};

		try {
			newFarmerResponse = await fetch('/api/farmer', {
				method: 'POST',
				body: JSON.stringify(newFarmer),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			$farmName = name; // Set store value
			$farmerName = name; // Set store value
			goto('/farm'); // Forward to farm route
		} catch (error) {
			modalStore.showModal({
				type: 'error',
				title: 'Error',
				body: 'There was a problem creating your farmer record. Please try again.'
				// Define any additional modal properties if needed
			});
		}
	}

	function loadFarmer(id) {}
</script>

<div class="grid h-screen gap-4 place-items-center">
	<h1
		class="text-6xl text-transparent uppercase h1 bg-gradient-to-t from-green-700 to-green-300 bg-clip-text box-decoration-clone"
	>
		<span
			class="text-5xl font-thin text-transparent lowercase bg-gradient-to-t from-red-700 to-red-300 bg-clip-text box-decoration-clone"
			>micro</span
		>Farmer
	</h1>
	<div class="grid grid-flow-col gap-8">
		{#if data.farmers}
			<button
				type="button"
				class="btn btn-xl variant-filled"
				on:click={() => modalStore.trigger(modalOpen)}
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
							d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
						/>
					</svg>
				</span>
				<span>Open</span>
			</button>
		{/if}

		<button
			type="button"
			class="btn btn-xl variant-filled"
			on:click={() => modalStore.trigger(modalNew)}
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
	</div>
</div>
