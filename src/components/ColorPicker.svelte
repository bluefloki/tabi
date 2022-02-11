<script lang="ts">
	import { colors } from '../utils/colorClasses';
	import classnames from 'classnames';
	import { questFormData } from '../stores';
</script>

<div class="ml-4 w-full grid grid-cols-6 gap-x-16 gap-y-4 place-items-center">
	{#each colors as color}
		<input
			type="radio"
			name="color"
			bind:group={$questFormData.color}
			value={color}
			class={classnames(
				`p-2 rounded-lg bg-${color}-500 appearance-none h-8 w-8 border-4 border-${color}-500 checked:border-white transition-all ease-linear duration-300 cursor-pointer`
			)}
		/>
	{/each}
</div>
