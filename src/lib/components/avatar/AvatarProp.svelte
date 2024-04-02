<script>
	// @ts-nocheck
	import { avatar } from '$lib/stores';
	import AvatarButton from './AvatarButton.svelte';
	export let key;

	function updateAvatar(key, direction) {
		console.log(`Avatar ${key}: `, $avatar[key]);
		$avatar[key] = direction === 'up' ? $avatar[key]++ : $avatar[key]--;
	}
</script>

<div class="grid items-center grid-cols-3 place-items-center">
	<AvatarButton direction="left" on:click={updateAvatar(key, 'down')} />
	<div class="text-center">
		<p class="capitalize">{key}</p>
		<p>{$avatar[key]}</p>
	</div>
	<AvatarButton direction="right" on:click={updateAvatar(key, 'up')} />
</div>
