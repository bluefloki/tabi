<script lang="ts">
	import classnames from 'classnames';
	import { buttonStyles } from '../styles';
	import { CheckCircleIcon, CornerDownRightIcon, LoaderIcon } from 'svelte-feather-icons';
	import type { IQuest } from '../utils/types';
	import { formatTime } from '../utils/functions/index';
	import { drawerAction, openDrawer, questFormData } from '../stores';
	import { fly } from 'svelte/transition';
	import { supabase } from '../utils/supabase';
	import { quests } from '../stores';

	// Props
	export let data: IQuest;

	// Reactive
	$: color = data.color;
	$: objectives = JSON.parse(data.objectives);
	$: rewards = JSON.parse(data.rewards!);
	$: timerTime = data.timer!;

	// Variables
	let active = false;
	let completed = data.completed;
	let timerInterval: any;
	let loading = false;
	let loading2 = false;

	// Functions
	const startTimer = () => {
		active = true;
		if (data.countdown && timerTime != 0) timerInterval = setInterval(() => --timerTime, 1000);
		else timerInterval = setInterval(() => timerTime++, 1000);
	};

	const stopTimer = async (id: number) => {
		clearInterval(timerInterval);

		// Set timer in database
		loading = true;
		const { error } = await supabase.from('quests').update({ timer: timerTime }).match({ id });
		if (error) throw error;

		loading = false;
		active = false;
	};

	const setCompleted = async () => {
		clearInterval(timerInterval);

		loading2 = true;
		const { error } = await supabase
			.from('quests')
			.update({ completed: true })
			.match({ id: data.id });
		if (error) throw error;
		active = false;
		completed = true;
		loading2 = false;
	};

	const removeQuest = async () => {
		loading2 = true;
		const { error } = await supabase.from('quests').delete().match({
			id: data.id
		});
		quests.set($quests.filter((el) => el.id !== data.id));
		if (error) throw error;
		loading2 = false;
	};

	const replayQuest = async () => {
		loading = true;
		const { error } = await supabase
			.from('quests')
			.update({ completed: false })
			.match({ id: data.id });
		if (error) throw error;
		completed = false;
		loading = false;
	};
</script>

<div
	class={classnames(`w-80 border-4 rounded-lg p-6`, {
		[`bg-${color}-500`]: active,
		'bg-amber-500 border-amber-500': completed,
		[`border-${color}-500`]: !completed
	})}
	transition:fly={{ x: 100 }}
>
	<div class="mb-6">
		<!-- Emoji -->
		{#if data.emoji}
			<p
				class={classnames('text-4xl text-center mb-2', {
					'animate-bounce': active
				})}
			>
				{data.emoji}
			</p>
		{/if}
		<!-- Heading -->
		<h3
			class={classnames(`text-3xl text-center font-oswald`, {
				'text-amber-100': completed,
				[`text-${color}-100`]: !completed
			})}
		>
			{data.title}
		</h3>
	</div>

	<div class="mb-6">
		<!-- Objectives -->
		<h4
			class={classnames(`font-oswald text-xl mb-2`, {
				'text-amber-100': completed,
				[`text-${color}-100 mb-2`]: !completed
			})}
			transition:fly={{ x: 100 }}
		>
			Objectives
		</h4>
		<ul>
			{#each objectives as o}
				<li class="grid grid-cols-7 items-center mb-1" transition:fly={{ x: 100 }}>
					<CornerDownRightIcon size="1x" class="col-span-1" />
					<p class="col-span-6">{o}</p>
				</li>
			{/each}
		</ul>
	</div>

	{#if data.rewards && data.rewards !== '[]'}
		<div class="mb-6">
			<!-- Rewards -->
			<h4
				class={classnames(`font-oswald text-xl`, {
					'text-amber-100': completed,
					[`text-${color}-100 mb-2`]: !completed
				})}
				transition:fly={{ x: 100 }}
			>
				Rewards
			</h4>
			<ul>
				{#each rewards as x}
					<li class="grid grid-cols-7 items-center mb-1" transition:fly={{ x: 100 }}>
						<CheckCircleIcon
							size="1x"
							class={classnames('col-span-1', {
								'text-green-600': completed
							})}
						/>
						<p class={classnames('col-span-6')}>
							{x}
						</p>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="text-center font-oswald mb-6">
		{#if !completed}
			<!-- Clock -->

			<div class="text-3xl">{formatTime(timerTime)}</div>
			<p class={`text-${color}-100`}>
				{#if data.countdown}
					Left
				{:else}
					Elapsed
				{/if}
			</p>
		{:else}
			<p class="text-3xl mb-8">Completed</p>
		{/if}
	</div>

	<!-- Buttons -->
	{#if !completed}
		<div>
			<button
				class={buttonStyles(data.color)}
				disabled={loading || loading2}
				on:click={() => (active ? stopTimer(data.id) : startTimer())}
			>
				{#if loading}
					<LoaderIcon size="1.5x" strokeWidth={1} class="animate-spin w-full text-center" />
				{:else if !loading && active}
					Stop
				{:else if !loading && !active}
					Start
				{/if}
			</button>
			<div class="flex flex-row items-center mt-3 gap-2">
				<button
					class={buttonStyles(data.color)}
					disabled={loading || loading2}
					on:click={setCompleted}
					>{#if loading2}
						<LoaderIcon size="1.5x" strokeWidth={1} class="animate-spin w-full text-center" />
					{:else}Finish{/if}
				</button>
				<button
					class={buttonStyles(data.color)}
					disabled={loading || loading2}
					on:click={() => {
						questFormData.set({
							...data,
							objectives: JSON.parse(data.objectives).join(', '),
							rewards: data.rewards ? JSON.parse(data.rewards).join(', ') : ''
						});

						clearInterval(timerInterval);
						active = false;
						openDrawer.set(true);
						drawerAction.set('UPDATE');
					}}
				>
					Edit
				</button>
			</div>
		</div>

		<!-- Buttons if completed -->
	{:else}
		<div>
			<button
				class={buttonStyles(data.color, completed)}
				disabled={loading || loading2}
				on:click={replayQuest}
			>
				{#if loading}
					<LoaderIcon size="1.5x" strokeWidth={1} class="animate-spin w-full text-center" />
				{:else}
					Replay
				{/if}
			</button>
			<div class="mb-3" />
			<button
				class={buttonStyles(data.color, completed)}
				disabled={loading || loading2}
				on:click={removeQuest}
				>{#if loading2}
					<LoaderIcon size="1.5x" strokeWidth={1} class="animate-spin w-full text-center" />
				{:else}Remove{/if}
			</button>
		</div>
	{/if}
</div>
