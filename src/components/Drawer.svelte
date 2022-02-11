<script lang="ts">
	import { supabase } from '../utils/supabase';
	import Drawer from '../components/UI/DrawerComponent.svelte';
	import { openDrawer, drawerAction, questFormData, quests, user } from '../stores';
	import { LoaderIcon } from 'svelte-feather-icons';
	import type { IFormValues, IQuest, IQuestFormData } from '../utils/types';
	import { formButtonStyles } from '../styles';
	import { createForm } from 'felte';
	import DrawerForm from './DrawerForm.svelte';
	import { validator } from '@felte/validator-zod';
	import type { ValidatorConfig } from '@felte/validator-zod';
	import type zod from 'zod';
	import { schema } from '../utils/validationSchema';

	// Variables
	let loading = false;
	let deleteLoading = false;
	let submitting = false;

	// Functions
	async function handleDelete() {
		submitting = true;
		deleteLoading = true;

		let id = ($questFormData as IQuest).id;

		const { error } = await supabase.from('quests').delete().match({
			id
		});
		quests.set($quests.filter((el) => el.id !== id));
		if (error) throw error;

		deleteLoading = false;
		submitting = false;
		openDrawer.set(false);
	}

	const {
		form,
		errors: formErrors,
		reset
	} = createForm<zod.infer<typeof schema>, ValidatorConfig>({
		extend: validator,
		validateSchema: schema,
		onSubmit: async (values: IFormValues) => {
			// Variables
			let res: any;
			let o = values.objectives.split(',').map((el: string) => el.trim());
			let r = values
				.rewards!.split(',')
				.map((el: string) => el.trim())
				.filter((el: string) => el !== '');

			// let timer = values.countdown
			// 	? convertToSeconds(values.hours, values.minutes, values.seconds)
			// 	: 0;
			// let { hours, minutes, seconds, ...felteData } = values;

			// Prepare data
			let data: IQuestFormData = {
				...values,
				objectives: JSON.stringify(o),
				rewards: JSON.stringify(r),
				user_id: $user!.id
				// countdown: values.countdown,
				// timer
			};

			// Insert or Update
			loading = true;
			if ($drawerAction === 'ADD') {
				res = await supabase.from('quests').insert([data]);
				quests.set([...$quests, res.data[0] as IQuest]);
			} else if ($drawerAction === 'UPDATE') {
				res = await supabase.from('quests').update([data]).match({ id: $questFormData.id });
				const objIndex = $quests.findIndex((el) => el.id == res.data[0].id);
				$quests[objIndex] = res.data[0];
			}
			if (res.error) throw res.error;

			loading = false;
			openDrawer.set(false);
		}
	});
</script>

<div class="drawer-container">
	<Drawer
		open={$openDrawer}
		on:clickAway={() => {
			reset();
			formErrors.set({});
			openDrawer.set(false);
			drawerAction.set(undefined);
		}}
		placement="right"
		duration={0.3}
		size="50%"
	>
		<form use:form>
			<DrawerForm err={$formErrors} />

			<!-- Buttons -->
			<div class="flex flex-row items-center gap-4 mb-8">
				<button
					type="submit"
					class={formButtonStyles('', true, '36')}
					disabled={deleteLoading || submitting}
				>
					{#if loading === true}
						<LoaderIcon size="1.5x" strokeWidth={1} class="animate-spin w-full text-center" />
					{:else}
						Submit
					{/if}
				</button>
				{#if $drawerAction === 'UPDATE'}
					<button
						type="button"
						class={formButtonStyles('red', false, '36')}
						disabled={loading || submitting}
						on:click={handleDelete}
					>
						{#if deleteLoading === true}
							<LoaderIcon size="1.5x" strokeWidth={1} class="animate-spin w-full text-center" />
						{:else}
							Delete
						{/if}
					</button>
				{/if}
			</div>
		</form>
	</Drawer>
</div>

<style>
	.drawer-container :global(.drawer .panel) {
		background-color: #262626;
		color: white;
		padding: 2rem 3rem;
	}
</style>
