<script>
	// @ts-nocheck

	import { farmerId, harvests } from '$lib/stores';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	export let parent;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let inputHarvestId;
	let inputHarvestCrop;
	let inputHarvestHarvestedAt;
	let inputHarvestGrams;
	let inputHarvestTraySize;

	if ($modalStore[0].meta.harvest) {
		inputHarvestCrop = $modalStore[0].meta.harvest.crop;
		inputHarvestId = $modalStore[0].meta.harvest.id;
		inputHarvestHarvestedAt = new Date($modalStore[0].meta.harvest.harvestedAt)
			.toISOString()
			.split('T')[0];
		inputHarvestGrams = $modalStore[0].meta.harvest.grams;
		inputHarvestTraySize = $modalStore[0].meta.harvest.traySize;
	} else {
		inputHarvestHarvestedAt = new Date().toISOString().split('T')[0];
	}

	async function createHarvest() {
		let newHarvestRequest;
		const newHarvest = {
			farmerId: $farmerId,
			crop: inputHarvestCrop,
			harvestedAt: new Date(inputHarvestHarvestedAt).toISOString(),
			grams: inputHarvestGrams,
			traySize: inputHarvestTraySize
		};

		try {
			newHarvestRequest = await fetch('/api/harvests', {
				method: 'POST',
				body: JSON.stringify(newHarvest),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const response = await newHarvestRequest.json();

			const formattedResponse = {
				...response,
				harvestedAt: new Date(response.harvestedAt).toLocaleDateString('en-US', {
					timeZone: 'UTC',
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})
			};

			$harvests = [formattedResponse, ...$harvests];
			modalStore.close();
			const toast = {
				message: 'Harvest created',
				hideDismiss: true,
				timeout: 3000
			};
			toastStore.trigger(toast);
		} catch (error) {
			modalStore.showModal({
				type: 'error',
				title: 'Error',
				body: 'Oops! There was a problem creating your harvest. Please try again.'
			});
		}
	}

	async function deleteHarvest() {
		const deleteHarvest = await fetch('/api/harvests', {
			method: 'DELETE',
			body: JSON.stringify({ id: inputHarvestId }),
			headers: {
				'Content-Type': 'application/json'
			}
		}); // Delete supply from database
		const confirmation = await deleteHarvest.json();
		$harvests = $harvests.filter((harvest) => harvest.id !== inputHarvestId); // Remove deleted harvest from store
		modalStore.close(); // Close modal
		const toast = {
			message: 'Harvest deleted',
			hideDismiss: true,
			timeout: 3000
		};
		toastStore.trigger(toast);
	}

	async function updateHarvest() {
		const updateHarvest = await fetch('/api/harvests', {
			method: 'PUT',
			body: JSON.stringify({
				id: inputHarvestId,
				crop: inputHarvestCrop,
				harvestedAt: new Date(inputHarvestHarvestedAt).toISOString(),
				grams: inputHarvestGrams,
				traySize: inputHarvestTraySize
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}); // Update harvest in database
		const confirmation = await updateHarvest.json();
		const formattedConfirmation = {
			...confirmation,
			harvestedAt: new Date(confirmation.harvestedAt).toLocaleDateString('en-US', {
				timeZone: 'UTC',
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})
		};
		$harvests = $harvests.map((harvest) =>
			harvest.id === inputHarvestId ? { ...harvest, ...formattedConfirmation } : harvest
		); // Update harvest in store
		modalStore.close(); // Close modal
		const toast = {
			message: 'Harvest updated',
			hideDismiss: true,
			timeout: 3000
		};
		toastStore.trigger(toast);
	}
</script>

{#if $modalStore[0]}
	<div class="p-4 rounded-lg w-modal-wide bg-surface-100-800-token">
		<header class="text-2xl font-bold modal-header">
			{$modalStore[0].meta.action === 'update' ? 'Update' : 'Create'} Harvest
		</header>
		<div class="grid grid-cols-[1fr_2fr] gap-4 items-center mt-4">
			<label class="text-right label" for="harvest-harvested-at">
				<span>Harvest Date</span>
			</label>
			<input
				name="harvest-harvested-at"
				class="px-3 py-1 input"
				class:input-error={!inputHarvestHarvestedAt}
				class:input-success={inputHarvestHarvestedAt}
				type="date"
				bind:value={inputHarvestHarvestedAt}
			/>
			<label class="text-right label" for="harvest-crop">
				<span>Crop</span>
			</label>
			<input
				name="harvest-crop"
				class="px-3 py-1 input"
				class:input-error={!inputHarvestCrop}
				class:input-success={inputHarvestCrop}
				type="text"
				bind:value={inputHarvestCrop}
			/>
			<label class="text-right label" for="harvest-tray-size">
				<span>Tray Size</span>
			</label>
			<input
				name="harvest-tray-size"
				class="px-3 py-1 input"
				class:input-error={!inputHarvestTraySize}
				class:input-success={inputHarvestTraySize}
				placeholder="1020, 520, mini, ..."
				type="text"
				bind:value={inputHarvestTraySize}
			/>
			<label class="text-right label" for="harvest-grams">
				<span>Grams</span>
			</label>
			<input
				name="harvest-grams"
				class="px-3 py-1 input"
				class:input-error={!inputHarvestGrams}
				class:input-success={inputHarvestGrams}
				type="number"
				bind:value={inputHarvestGrams}
			/>
		</div>

		<footer class="mt-4 modal-footer {parent.regionFooter}">
			{#if $modalStore[0].meta.action === 'update'}
				<button class="btn {parent.buttonNegative}" on:click={() => deleteHarvest()}>Delete</button>
			{/if}
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Back</button>
			<button
				class="btn {parent.buttonPositive}"
				on:click={() =>
					$modalStore[0].meta.action === 'update' ? updateHarvest() : createHarvest()}
				disabled={!inputHarvestCrop ||
					!inputHarvestTraySize ||
					!inputHarvestGrams ||
					!inputHarvestHarvestedAt}
				>{$modalStore[0].meta.action === 'update' ? 'Update' : 'Create'}</button
			>
		</footer>
	</div>
{/if}
