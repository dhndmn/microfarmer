<script>
	// @ts-nocheck

	import { farmerId, supplies } from '$lib/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	export let parent;

	const modalStore = getModalStore();
	console.log('modalStore:', $modalStore);

	let inputSupplyCost;
	let inputSupplyName;
	let inputSupplyPurchasedAt;
	let inputSupplyQuantity;
	let inputSupplyType;

	async function createSupply() {
		let newSupplyRequest;
		const newSupply = {
			cost: parseInt(inputSupplyCost, 10) * 100, // Convert to cents
			farmerId: $farmerId,
			name: inputSupplyName,
			purchasedAt: new Date(inputSupplyPurchasedAt).toISOString(),
			quantity: inputSupplyQuantity,
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
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				}),
				quantity: response.quantity.toLocaleString('en-US'),
				cost: (response.cost / 100).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD'
				})
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
		modalStore.close();
		console.log('delete supply');
	}

	async function updateSupply() {
		modalStore.close();
		console.log('update supply');
	}
</script>

{#if $modalStore[0]}
	<div class="w-modal-wide">
		<div class="grid gap-4">
			<input
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
			<input
				class="px-3 py-1 input"
				class:input-error={!inputSupplyName}
				class:input-success={inputSupplyName}
				minlength="1"
				maxlength="30"
				placeholder="Name"
				required
				type="text"
				bind:value={inputSupplyName}
			/>
			<input
				class="px-3 py-1 input"
				class:input-error={!inputSupplyType}
				class:input-success={inputSupplyType}
				minlength="1"
				maxlength="30"
				placeholder="Type"
				required
				type="text"
				bind:value={inputSupplyType}
			/>
			<input
				class="px-3 py-1 input"
				class:input-error={!inputSupplyQuantity}
				class:input-success={inputSupplyQuantity}
				minlength="1"
				maxlength="30"
				placeholder="Quantity"
				required
				type="number"
				bind:value={inputSupplyQuantity}
			/>
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
					type="text"
					placeholder="0.00 or 0"
					class:input-error={!inputSupplyCost}
					class:input-success={inputSupplyCost}
					minlength="1"
					maxlength="30"
					required
					bind:value={inputSupplyCost}
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
				on:click={() => createSupply()}
				disabled={!inputSupplyName ||
					!inputSupplyType ||
					!inputSupplyQuantity ||
					!inputSupplyCost ||
					!inputSupplyPurchasedAt}
				>{$modalStore[0].meta.action === 'update' ? 'Update' : 'Create'}</button
			>
		</footer>
	</div>
{/if}
