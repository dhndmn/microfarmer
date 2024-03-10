<script>
	// @ts-nocheck

	import { getModalStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { farmName, farmerId, farmerName } from '$lib/stores/farmer';
	export let parent;

	let inputFarmName;
	let inputFarmerName;
	const modalStore = getModalStore();

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
			$farmName = inputFarmName; // Set store value
			$farmerName = inputFarmerName; // Set store value
			$farmerId = newFarmerRequest.id;
			if (newFarmerRequest.ok) {
				const responseData = await newFarmerRequest.json();
				localStorage.setItem('microfarmer.farmerId', responseData.id.toString());
			} else {
				throw new Error('Failed to create new farmer');
			}
			modalStore.close();
			goto('/farm'); // Forward to farm route
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
	<div class="w-modal-wide">
		<div class="grid gap-4">
			<input
				class="px-3 py-1 input"
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
					class="px-3 py-1 input"
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
