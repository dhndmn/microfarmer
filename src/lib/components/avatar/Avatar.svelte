<script>
	// @ts-nocheck
	import { AppShell } from '@skeletonlabs/skeleton';
	import { avatar } from '$lib/stores';
	import AvatarComposite from './AvatarComposite.svelte';
	import AvatarProp from './AvatarProp.svelte';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<div
			class="relative flex items-center justify-center w-32 h-48 bg-no-repeat"
			style="background-image: url(./images/avatar/daybg.png)"
		>
			<AvatarComposite />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<div class="grid items-center justify-center gap-2">
			{#each Object.keys($avatar) as key}
				<AvatarProp {key} />
			{/each}
		</div>
	</svelte:fragment>
</AppShell>
