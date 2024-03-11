<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { farmName, farmerId, farmerName } from '$lib/stores';
	import { goto } from '$app/navigation';
	export let farmer;
	export let farm;
	export let id;
</script>

<div
	class="flex items-center gap-4 p-4 card hover:cursor-pointer"
	on:click={() => {
		goto('/farm');
		$farmName = farm;
		$farmerId = id;
		$farmerName = farmer;
	}}
>
	<Avatar
		src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
		width="w-16"
		rounded="rounded-full"
	/>
	{farmer} - {farm} Farm
</div>
