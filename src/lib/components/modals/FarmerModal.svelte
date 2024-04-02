<script>
	// @ts-nocheck

	import Avatar from '../avatar/Avatar.svelte';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { dayTime, farmName, farmerId, farmerName } from '$lib/stores';
	export let parent;

	let inputFarmName;
	let inputFarmerName;
	const modalStore = getModalStore();
	const toastStore = getToastStore();

	async function createFarmer() {
		let newFarmerRequest;
		const newFarmer = {
			name: inputFarmerName,
			farmName: inputFarmName
		};

		try {
			newFarmerRequest = await fetch('/api/farmer', {
				method: 'POST',
				body: JSON.stringify(newFarmer),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (newFarmerRequest.ok) {
				const responseData = await newFarmerRequest.json();
				$farmerId = responseData.id; // Set store value
				$farmerName = inputFarmerName; // Set store value
				$farmName = inputFarmName; // Set store value
				modalStore.close();
				const toast = {
					message: `Good ${dayTime}, farmer ${$farmerName}!`,
					hideDismiss: true,
					timeout: 3000
				};
				toastStore.trigger(toast);
				goto('/farm'); // Forward to farm route
			} else {
				throw new Error('Failed to create new farmer');
			}
		} catch (error) {
			modalStore.showModal({
				type: 'error',
				title: 'Error',
				body: 'Oops!There was a problem creating your farmer. Please try again.'
			});
		}
	}
</script>

{#if $modalStore[0]}
	<div class="grid gap-4 p-4 rounded-lg w-modal-wide bg-surface-100-800-token">
		<h2 class="h2">New Farmer</h2>
		<div class="grid gap-4">
			<div class="grid gap-4">
				<input
					class="h-8 px-3 py-1 input"
					class:input-error={!inputFarmerName}
					class:input-success={inputFarmerName}
					minlength="1"
					maxlength="30"
					placeholder="Name"
					required
					type="text"
					bind:value={inputFarmerName}
				/>
				<div class="flex items-center gap-4">
					<input
						class="h-8 px-3 py-1 input"
						class:input-error={!inputFarmName}
						class:input-success={inputFarmName}
						minlength="1"
						maxlength="30"
						placeholder="Farm Name"
						required
						type="text"
						bind:value={inputFarmName}
					/>
					<span>Farm</span>
				</div>
			</div>
			<Avatar />
		</div>

		<footer class="mt-4 modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Back</button>
			<button
				class="btn {parent.buttonPositive}"
				on:click={() => createFarmer()}
				disabled={!inputFarmerName || !inputFarmName}>OK</button
			>
		</footer>
	</div>
{/if}
