<script lang="ts">
	import Quest from 'src/components/Quest.svelte';
	import { PlusIcon, LoaderIcon } from 'svelte-feather-icons';
	import { supabase } from '../../utils/supabase';
	import { onMount } from 'svelte';
	import {
		quests,
		questsTimeout,
		openDrawer,
		drawerAction,
		questFormData,
		initQuestForm
	} from '../../stores';
	import Drawer from 'src/components/Drawer.svelte';
	import type { IQuest } from 'src/utils/types';

	// Variables
	let loading: boolean = true;

	// functions
	onMount(async () => {
		if ($quests.length < 1 || $questsTimeout) {
			const res = await supabase.from('quests').select('*').order('id', {
				ascending: true
			});
			$quests = res.data as IQuest[];
		}
		loading = false;
	});
</script>

<section>
	<div class="grid grid-cols-3 gap-x-20 gap-y-10 place-items-center">
		{#if loading || $questsTimeout}
			<div class="mt-36 col-span-full">
				<LoaderIcon size="3x" class="text-amber-400 animate-spin" />
			</div>
		{:else if $quests.length !== 0}
			{#each $quests as quest (quest.id)}
				<Quest data={quest} />
			{/each}
		{/if}
		<div class="text-center mt-20 col-span-full">
			<!-- Add Button -->
			<button
				class="bg-white rounded-xl hover:bg-amber-200 transition-all ease-linear duration-300 disabled:hover:bg-white disabled:cursor-not-allowed"
				on:click={() => {
					questFormData.set({ ...initQuestForm, init: false });
					openDrawer.set(true);
					drawerAction.set('ADD');
				}}
				disabled={loading}
			>
				<PlusIcon size="4x" class="text-neutral-800" strokeWidth={1} />
			</button>
		</div>
		<Drawer />
	</div>
</section>
