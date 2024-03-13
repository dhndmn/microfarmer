<script>
	// @ts-nocheck

	import { farmerId, harvests } from '$lib/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	export let parent;

	const modalStore = getModalStore();

	let inputHarvestId;
	let inputHarvestCrop;
	let inputHarvestHarvestedAt;
	let inputHarvestGrams;
	let inputHarvestTraySize;

	console.log($modalStore[0].meta.harvest);

	if ($modalStore[0].meta.harvest) {
		inputHarvestCrop = $modalStore[0].meta.harvest.crop;
		inputHarvestId = $modalStore[0].meta.harvest.id;
		inputHarvestHarvestedAt = new Date($modalStore[0].meta.harvest.harvestedAt)
			.toISOString()
			.split('T')[0];
		inputHarvestGrams = $modalStore[0].meta.harvest.grams;
		inputHarvestTraySize = $modalStore[0].meta.harvest.traySize;
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
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				}),
				grams: response.grams.toLocaleString('en-US')
			};

			$harvests = [formattedResponse, ...$harvests];
			console.log('Harvests:', $harvests);
			modalStore.close();
		} catch (error) {
			modalStore.showModal({
				type: 'error',
				title: 'Error',
				body: 'Oops!There was a problem creating your harvest. Please try again.'
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
		console.log('harvest deleted:', confirmation);
		console.log('Harvests:', $harvests);
		modalStore.close(); // Close modal
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
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			}),
			grams: parseInt(confirmation.grams, 10)
		};
		$harvests = $harvests.map((harvest) =>
			harvest.id === inputHarvestId ? { ...harvest, ...formattedConfirmation } : harvest
		); // Update harvest in store
		console.log('harvest updated:', confirmation);
		console.log('Harvests:', $harvests);
		modalStore.close(); // Close modal
	}
</script>

{#if $modalStore[0]}
	<div class="w-modal-wide">
		<div class="grid grid-cols-[1fr_auto] gap-4 items-center">
			<label class="label" for="harvest-harvested-at">
				<span>Harvest Date</span>
			</label>
			<input
				name="harvest-harvested-at"
				class="px-3 py-1 input"
				class:input-error={!inputHarvestHarvestedAt}
				class:input-success={inputHarvestHarvestedAt}
				minlength="1"
				maxlength="30"
				placeholder="Harvest Date"
				required
				type="date"
				bind:value={inputHarvestHarvestedAt}
			/>
			<label class="label" for="harvest-crop">
				<span>Crop</span>
			</label>
			<input
				name="harvest-crop"
				class="px-3 py-1 input"
				class:input-error={!inputHarvestCrop}
				class:input-success={inputHarvestCrop}
				minlength="1"
				maxlength="30"
				placeholder=""
				required
				type="text"
				bind:value={inputHarvestCrop}
			/>
			<label class="label" for="harvest-tray-size">
				<span>Tray Size</span>
			</label>
			<input
				name="harvest-tray-size"
				class="px-3 py-1 input"
				class:input-error={!inputHarvestTraySize}
				class:input-success={inputHarvestTraySize}
				minlength="1"
				maxlength="30"
				placeholder="1020, 520, mini, ..."
				required
				type="text"
				bind:value={inputHarvestTraySize}
			/>
			<label class="label" for="harvest-grams">
				<span>Grams</span>
			</label>
			<input
				name="harvest-grams"
				class="px-3 py-1 input"
				class:input-error={!inputHarvestGrams}
				class:input-success={inputHarvestGrams}
				minlength="1"
				maxlength="30"
				placeholder=""
				required
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
