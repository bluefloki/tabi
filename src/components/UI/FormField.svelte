<script lang="ts">
	import { capitalize } from 'src/utils/functions';
	import { labelStyles, inputStyles } from '../../styles';

	// Props
	export let name: string;
	export let type: string;
	export let placeholder: string = capitalize(name);
	export let label: string = name;
	export let unset: boolean = false;
	export let errors: string | string[] | null | undefined = undefined;
</script>

<div class="flex flex-col gap-4 mb-4">
	<label for={name} class={labelStyles}>{capitalize(label)}</label>
	<input {type} {name} class={inputStyles} {placeholder} data-felte-unset-on-remove={unset} />
</div>
{#if errors}
	{#each errors as err}
		<p class="font-oswald text-md text-red-400 mb-4">{err}</p>
	{/each}
{/if}
