<script lang="ts">
	import { ApertureIcon, UserIcon } from 'svelte-feather-icons';
	import classnames from 'classnames';
	import { activePage, openDropdown } from '../stores';
	import { onMount } from 'svelte';
	import Dropdown from './UI/Dropdown.svelte';

	// Variables
	let url = ``;
	let navlinks = [
		{ id: 1, title: 'Quests', href: '/app' },
		{ id: 2, title: 'Stats', href: '/app/stats' },
		{ id: 3, title: 'Trophies', href: '/app/trophies' }
	];

	onMount(() => {
		url = window.location.href;
		navlinks.forEach((link) => {
			url.includes(link.href) && activePage.set(link.title);
		});
	});
</script>

<nav class="flex flex-row items-center justify-between mb-10">
	<!-- Logo -->
	<ApertureIcon size="2x" strokeWidth={1} class="text-2xl" />

	<!-- Links -->
	<ul class="flex flex-row items-center justify-center gap-10 text-4xl font-oswald">
		{#each navlinks as link (link.id)}
			<li class="flex flex-col items-center gap-4">
				<a
					href={link.href}
					class={classnames('hover:text-amber-400 transition-all ease-in-out duration-300', {
						'text-amber-400': $activePage === link.title
					})}
					on:click={() => activePage.set(link.title)}>{link.title}</a
				>
				<div
					class={classnames('p-1 rounded-full', {
						'bg-amber-400': $activePage === link.title
					})}
				/>
			</li>
		{/each}
	</ul>

	<!-- Profile Picture -->
	<div
		class="dropdown-button bg-neutral-700 p-1.5 rounded-xl cursor-pointer border-2 border-neutral-700 hover:border-blue-600"
		on:click={() => openDropdown.set(!$openDropdown)}
		aria-expanded="true"
		aria-haspopup="true"
	>
		<UserIcon size="2x" strokeWidth={1} />
	</div>
	<Dropdown />
</nav>
