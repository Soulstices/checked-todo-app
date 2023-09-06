<script lang="ts">
	import ThemePicker from './ThemePicker.svelte'
	import { THEMES, reverseTasksLayout, tasks } from '../lib/store'

	let isActive = false
	let colorTextActive = false

	$: $tasks
</script>

<div class="m-1">
	<p class="font-bold text-xl ml-2 text-modal pb-5">Settings</p>

	<div class="flex flex-row pb-5">
		<div class="flex flex-col">
			<p class="font-bold text-md ml-2 text-modal">Reverse Tasks Layout</p>
			<p class=" text-sm font-medium ml-2 text-task pr-3">
				By default, new tasks are displayed at the top. When the option is enabled, new tasks will instead appear at the bottom.
			</p>
		</div>

		<label class="relative inline-flex items-center cursor-pointer m-auto">
			<input
				type="checkbox"
				value=""
				class="sr-only peer"
				bind:checked={$reverseTasksLayout}
				on:click={() => {
					if ($reverseTasksLayout) {
						$tasks.sort((a, b) => b.date - a.date)
					} else {
						$tasks.sort((a, b) => a.date - b.date)
					}
				}}
			/>
			<div
				class="w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-toggle-slider after:rounded-full after:h-5 after:w-5 after:transition-all"
				class:bg-toggle={!$reverseTasksLayout}
				class:bg-toggle-active={$reverseTasksLayout}
			></div>
		</label>
	</div>

	<div class="flex flex-col md:grid md:grid-cols-2 items-center text-lg font-bold pt-1 gap-0"></div>
	<p class="text-modal font-bold text-md mt-[-3px] ml-2">Theme</p>
</div>
<div class="flex flex-col md:grid md:grid-cols-2 items-center text-lg font-bold gap-4">
	{#each $THEMES as theme}
		<ThemePicker newTheme={theme} />
	{/each}
</div>
