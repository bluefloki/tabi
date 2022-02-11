<script lang="ts">
	import { supabase } from 'src/utils/supabase';
	import { scale } from 'svelte/transition';
	// @ts-ignore
	import OutClick from 'svelte-outclick';
	import { openDropdown } from 'src/stores';

	// Variables
	let styles =
		'hover:text-amber-400 transition-all ease-linear duration-300 hover:bg-neutral-600 rounded-lg px-2 py-1 cursor-pointer';

	// Functions
	const closeDropdown = () => {
		openDropdown.set(false);
	};
	const handleLogout = () => {
		closeDropdown();
		supabase.auth.signOut();
	};
</script>

{#if $openDropdown}
	<OutClick on:outclick={closeDropdown} excludeByQuerySelector={['.dropdown-button']}>
		<div
			class="bg-neutral-700 gap-2 p-1 w-36 text-lg flex flex-col rounded-lg absolute right-10 top-24 font-oswald"
			transition:scale={{ duration: 200 }}
		>
			<a href="/profile" class={styles} on:click={closeDropdown}>Profile</a>
			<a href="/settings" class={styles} on:click={closeDropdown}>Settings</a>
			<p class={styles} on:click={handleLogout}>Logout</p>
		</div>
	</OutClick>
{/if}
