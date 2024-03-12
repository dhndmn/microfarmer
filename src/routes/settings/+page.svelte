<script>
	import { clearStores } from '$lib/utilities/utilities';
	import { goto } from '$app/navigation';
	import { InputChip } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { supplyTypes } from '$lib/stores';
	export let data;

	$: $supplyTypes = [
		...new Set(data.supplyTypes.map((supply) => supply.type.toLowerCase()))
	].sort();
	console.log($supplyTypes);

	const modalStore = getModalStore();
	const modal = {
		type: 'confirm',
		title: 'Are you sure?',
		buttonTextCancel: 'Nevermind',
		buttonTextConfirm: 'Make it so',
		body: 'This will erase all your data and cannot be undone!',
		// TRUE if confirm pressed, FALSE if cancel pressed
		response: (r) => (r === true ? totalReset() : false)
	};

	async function totalReset() {
		clearStores();
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

<div class="grid gap-4">
	<div class="grid gap-4">
		<h2 class="h2">Supplies</h2>
		<h3 class="h3">Types</h3>
		<InputChip bind:value={$supplyTypes} name="chips" placeholder="Enter any value..." />
	</div>
	<div class="grid gap-4">
		<h2 class="h2">App</h2>
		<LightSwitch width="w-16" height="h-8" />

		<button
			type="button"
			class="btn variant-filled-warning"
			on:click={() => modalStore.trigger(modal)}
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
						d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
					/>
				</svg>
			</span>
			<span>Delete farm</span>
		</button>
	</div>
</div>
