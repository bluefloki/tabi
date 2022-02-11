<script lang="ts">
	import { labelStyles, formFieldStyles, timerInputStyles } from '../styles';
	import { fly } from 'svelte/transition';
	import { questFormData } from '../stores';
	import { convertFromSeconds } from '../utils/functions';

	// Variables
	let { h, m, s } = convertFromSeconds($questFormData.timer!);
</script>

<div class={formFieldStyles} transition:fly={{ x: 100 }}>
	<label for="timer" class={labelStyles}>
		<p>
			Timer
			<span class="text-amber-400">*</span>
		</p>
	</label>
	<div class="flex flex-row items-center gap-8">
		<input
			type="text"
			placeholder="hrs"
			class={timerInputStyles}
			name="hours"
			data-felte-unset-on-remove
			value={h.toString()}
		/>
		<p class="text-3xl font-oswald">:</p>
		<input
			type="text"
			placeholder="mins"
			class={timerInputStyles}
			name="minutes"
			data-felte-unset-on-remove
			value={m.toString()}
		/>
		<p class="text-3xl font-oswald">:</p>
		<input
			type="text"
			placeholder="secs"
			class={timerInputStyles}
			name="seconds"
			data-felte-unset-on-remove
			value={s.toString()}
		/>
	</div>
</div>
