<script context="module" lang="ts">
	import { get } from 'svelte/store';
	import { user } from 'src/stores';

	// export async function load() {
	// 	if (!get(user))
	// 		return {
	// 			status: 302,
	// 			redirect: '/login'
	// 		};
	// 	return {};
	// }
</script>

<script>
	import Navbar from 'src/components/Navbar.svelte';
</script>

<!-- All the routes are protected -->
<div class="min-h-screen px-16 py-8">
	<Navbar />
	<slot />
</div>
