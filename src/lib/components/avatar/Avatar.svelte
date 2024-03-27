<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import { avatar } from '$lib/stores';
	import AvatarButton from './AvatarButton.svelte';
	import Hair from './Hair.svelte';
	import Body from './Body.svelte';
	import Arms from './Arms.svelte';
	import Shirt from './Shirt.svelte';
	import Pants from './Pants.svelte';

	let property;

	function updateAvatar() {
		console.log(`Avatar: `, $avatar);
	}
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<div class="grid gap-2">
			<AvatarButton direction="random" />
			<!-- <AvatarButton direction="left" /> -->
		</div>
	</svelte:fragment>

	<!-- Farmer Avatar -->
	<div
		class="relative flex items-center justify-center h-48 bg-no-repeat"
		style="background-image: url(./images/avatar/daybg.png)"
	>
		<Hair />
		<Body />
		<Arms />
		<Shirt />
		<Pants />
	</div>

	<svelte:fragment slot="sidebarRight">
		<!-- <AvatarButton direction="right" /> -->
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<div class="grid items-center justify-center gap-2">
			<div class="grid items-center grid-cols-3">
				<AvatarButton direction="left" />
				<div class="text-center">
					<p>Gender</p>
					<p>1</p>
				</div>
				<AvatarButton direction="right" />
			</div>
			<div class="grid items-center grid-cols-3">
				<AvatarButton direction="left" />
				<p>Skin</p>
				<AvatarButton direction="right" />
			</div>
			<div class="grid items-center grid-cols-3">
				<AvatarButton direction="left" />
				<p>Hair</p>
				<AvatarButton direction="right" />
			</div>
			<div class="grid items-center grid-cols-3">
				<AvatarButton direction="left" />
				<p>Shirt</p>
				<AvatarButton direction="right" />
			</div>
			<div class="grid items-center grid-cols-3">
				<AvatarButton direction="left" />
				<p>Pants</p>
				<AvatarButton direction="right" />
			</div>
		</div>
	</svelte:fragment>
</AppShell>
