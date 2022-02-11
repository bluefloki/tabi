<script lang="ts">
	import { capitalize } from '../../utils/functions/helpers';
	import { questFormData } from '../../stores';
	import {
		drawerLabelStyles as labelStyles,
		drawerInputStyles as inputStyles,
		formFieldStyles
	} from '../../styles';
	import type { IQuestFormData } from '../../utils/types';

	// Props
	export let name: keyof IQuestFormData;
	export let placeholder: string;
	export let array: boolean = false;
	export let label: string = name;
	export let required: boolean = false;
	export let textarea: boolean = false;
	export let errors: string[];
</script>

<div class={formFieldStyles}>
	<label for="title" class={labelStyles}>
		<p>
			{capitalize(label)}
			{#if required}
				<span class="text-amber-400">*</span>
			{/if}
		</p>
		{#if array}
			<p class="text-xs text-amber-100 font-sans">(comma separated list)</p>
		{/if}
	</label>
	{#if textarea}
		<textarea type="text" class={inputStyles} {placeholder} {name} value={$questFormData[name]} />
	{:else}
		<input type="text" class={inputStyles} {placeholder} {name} value={$questFormData[name]} />
	{/if}
</div>
{#if errors}
	{#each errors as err}
		<p class="font-oswald text-md text-red-400 mb-4">{err}</p>
	{/each}
{/if}
