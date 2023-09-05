<script lang="ts">
	import ThemePicker from './ThemePicker.svelte'
	import { THEMES } from '../lib/store'
</script>

<p class="text-modal font-bold text-md mt-[-3px] ml-2">Theme</p>
<div class="flex flex-col md:grid md:grid-cols-2 items-center text-lg font-bold pt-1 gap-4">
	{#each $THEMES as theme}
		<ThemePicker newTheme={theme} />
	{/each}
</div>
