<script>
	// @ts-nocheck

	import { farmerId, supplies } from '$lib/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	export let parent;

	const modalStore = getModalStore();

	let inputSupplyCost;
	let inputSupplyId;
	let inputSupplyItem;
	let inputSupplyPurchasedAt;
	let inputSupplyType;

	if ($modalStore[0].meta.supply) {
		inputSupplyCost = $modalStore[0].meta.supply.cost / 100;
		inputSupplyId = $modalStore[0].meta.supply.id;
		inputSupplyItem = $modalStore[0].meta.supply.item;
		inputSupplyPurchasedAt = new Date($modalStore[0].meta.supply.purchasedAt)
			.toISOString()
			.split('T')[0];
		inputSupplyType = $modalStore[0].meta.supply.type;
	} else {
		inputSupplyPurchasedAt = new Date().toISOString().split('T')[0];
	}

	async function createSupply() {
		let newSupplyRequest;
		const newSupply = {
			cost: parseFloat(inputSupplyCost) * 100, // Convert to cents
			farmerId: $farmerId,
			item: inputSupplyItem,
			purchasedAt: new Date(inputSupplyPurchasedAt).toISOString(),
			type: inputSupplyType
		};

		try {
			newSupplyRequest = await fetch('/api/supplies', {
				method: 'POST',
				body: JSON.stringify(newSupply),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const response = await newSupplyRequest.json();

			const formattedResponse = {
				...response,
				purchasedAt: new Date(response.purchasedAt).toLocaleDateString('en-US', {
					timeZone: 'UTC',
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				}),
				cost: response.cost
			};

			$supplies = [formattedResponse, ...$supplies];
			modalStore.close();
		} catch (error) {
			modalStore.showModal({
				type: 'error',
				title: 'Error',
				body: 'Oops!There was a problem creating your supply. Please try again.'
			});
		}
	}

	async function deleteSupply() {
		const deleteSupply = await fetch('/api/supplies', {
			method: 'DELETE',
			body: JSON.stringify({ id: inputSupplyId }),
			headers: {
				'Content-Type': 'application/json'
			}
		}); // Delete supply from database
		const confirmation = await deleteSupply.json();
		$supplies = $supplies.filter((supply) => supply.id !== inputSupplyId); // Remove deleted supply from store
		modalStore.close(); // Close modal
	}

	async function updateSupply() {
		const updateSupply = await fetch('/api/supplies', {
			method: 'PUT',
			body: JSON.stringify({
				id: inputSupplyId,
				cost: inputSupplyCost * 100,
				item: inputSupplyItem,
				purchasedAt: new Date(inputSupplyPurchasedAt).toISOString(),
				type: inputSupplyType
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}); // Update supply in database
		const confirmation = await updateSupply.json();
		const formattedConfirmation = {
			...confirmation,
			purchasedAt: new Date(confirmation.purchasedAt).toLocaleDateString('en-US', {
				timeZone: 'UTC',
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})
		};
		$supplies = $supplies.map((supply) =>
			supply.id === inputSupplyId ? { ...supply, ...formattedConfirmation } : supply
		); // Update supply in store
		modalStore.close(); // Close modal
	}
</script>

{#if $modalStore[0]}
	<div class="p-4 rounded-lg w-modal-wide bg-surface-100-800-token">
		<header class="text-2xl font-bold modal-header">
			{$modalStore[0].meta.action === 'update' ? 'Update' : 'Create'} Supply
		</header>
		<div class="grid grid-cols-[1fr_2fr] gap-4 items-center mt-4">
			<label class="text-right label" for="supply-purchased-at">
				<span>Purchase Date</span>
			</label>
			<input
				name="supply-purchased-at"
				class="px-3 py-1 input"
				class:input-error={!inputSupplyPurchasedAt}
				class:input-success={inputSupplyPurchasedAt}
				minlength="1"
				maxlength="30"
				placeholder="Purchase Date"
				required
				type="date"
				bind:value={inputSupplyPurchasedAt}
			/>
			<label class="text-right label" for="supply-type">
				<span>Type</span>
			</label>
			<input
				name="supply-type"
				class="px-3 py-1 input"
				class:input-error={!inputSupplyType}
				class:input-success={inputSupplyType}
				minlength="1"
				maxlength="30"
				placeholder="seeds, soil, trays, ..."
				required
				type="text"
				bind:value={inputSupplyType}
			/>
			<label class="text-right label" for="supply-item">
				<span>Item</span>
			</label>
			<input
				name="supply-item"
				class="px-3 py-1 input"
				class:input-error={!inputSupplyItem}
				class:input-success={inputSupplyItem}
				minlength="1"
				maxlength="30"
				placeholder=""
				required
				type="text"
				bind:value={inputSupplyItem}
			/>
			<label class="text-right label" for="supply-cost">
				<span>Cost</span>
			</label>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div
					class="input-group-shim"
					class:input-error={!inputSupplyCost}
					class:input-success={inputSupplyCost}
				>
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
							d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				</div>
				<input
					name="supply-cost"
					type="text"
					placeholder=""
					class:input-error={!inputSupplyCost ||
						inputSupplyCost < 0 ||
						!/^\d+(\.\d{0,2})?$/.test(inputSupplyCost)}
					class:input-success={inputSupplyCost >= 0 && /^\d+(\.\d{0,2})?$/.test(inputSupplyCost)}
					minlength="1"
					maxlength="30"
					required
					bind:value={inputSupplyCost}
					pattern="^\d+(\.\d{(0, 2)})?$"
					on:input={() => {
						inputSupplyCost = inputSupplyCost.match(/^\d*(\.\d{0,2})?/)[0];
					}}
					on:blur={() => {
						const cost = parseFloat(inputSupplyCost);
						inputSupplyCost = !isNaN(cost) && cost > 0 ? cost.toFixed(2) : '0.00';
					}}
				/>
				<select class:input-error={!inputSupplyCost} class:input-success={inputSupplyCost}>
					<option>USD</option>
				</select>
			</div>
		</div>

		<footer class="mt-4 modal-footer {parent.regionFooter}">
			{#if $modalStore[0].meta.action === 'update'}
				<button class="btn {parent.buttonNegative}" on:click={() => deleteSupply()}>Delete</button>
			{/if}
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Back</button>
			<button
				class="btn {parent.buttonPositive}"
				on:click={() => ($modalStore[0].meta.action === 'update' ? updateSupply() : createSupply())}
				disabled={!inputSupplyItem ||
					!inputSupplyType ||
					!inputSupplyCost ||
					!inputSupplyPurchasedAt}
				>{$modalStore[0].meta.action === 'update' ? 'Update' : 'Create'}</button
			>
		</footer>
	</div>
{/if}
