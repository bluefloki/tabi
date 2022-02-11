<script lang="ts">
	import FormField from './UI/DrawerFormField.svelte';
	import ColorPicker from './ColorPicker.svelte';
	import { formFieldStyles, drawerLabelStyles as labelStyles } from '../styles';

	// Props
	export let err: any;

	$: errors = err;

	// $: hasCountdown = ($questFormData as IQuestFormData).countdown;
</script>

<div>
	<FormField name="title" placeholder="e.g. Workout" required errors={errors.title} />
	<FormField
		name="objectives"
		placeholder="e.g. 15 Pushups"
		array
		textarea
		required
		errors={errors.objectives}
	/>
	<FormField
		name="rewards"
		placeholder="e.g. 1x Anime Episode"
		array
		textarea
		errors={errors.rewards}
	/>
	<FormField name="emoji" placeholder="e.g. 🏋🏻" errors={errors.emoji} required />
	<div class={formFieldStyles}>
		<label for="color" class={labelStyles}>
			<p>Color <span class="text-amber-400">*</span></p>
		</label>
		<ColorPicker />
	</div>

	<!-- Countdown Timer -->

	<!-- <div class={formFieldStyles}>
		<label for="countdown" class={labelStyles}> <p>Countdown?</p></label>
		<input
			type="checkbox"
			on:click={() => ($questFormData.countdown = !$questFormData.countdown)}
			name="countdown"
			bind:checked={hasCountdown}
			class="h-6 w-6"
		/>
	</div>
	{#if hasCountdown}
		<TimerInput />
	{/if} -->
</div>
