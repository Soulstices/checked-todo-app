<script lang="ts">
	import ThemePicker from './ThemePicker.svelte'
	import { THEMES, useReversedLayout, useSmoothScroll, tasks } from '../lib/store'
	import SettingToggle from './SettingToggle.svelte'

	let isActive = false
	let colorTextActive = false

	$: $tasks
</script>

<div class="m-1">
	<p class="font-bold text-xl ml-2 text-modal pb-5">Settings</p>

	<SettingToggle
		title="Smooth Scrolling"
		description={`Clicking on the "Scroll to Top" or "Scroll to Bottom" buttons will smoothly scroll the page, instead of scrolling instantly.`}
		settingName="useSmoothScroll"
		updateInStorage={(value) => {
			useSmoothScroll.set(value)
		}}
	/>

	<SettingToggle
		title="Reverse Tasks Layout"
		description={`By default, new tasks are displayed at the top. When the option is enabled, new tasks will instead appear at the bottom.`}
		settingName="useReversedLayout"
		updateInStorage={(value) => {
			useReversedLayout.set(value)
		}}
	/>

	<div class="flex flex-col md:grid md:grid-cols-2 items-center text-lg font-bold pt-1 gap-0"></div>
	<p class="text-modal font-bold text-md mt-[-3px] ml-2">Theme</p>
</div>
<div class="flex flex-col md:grid md:grid-cols-2 items-center text-lg font-bold gap-4">
	{#each $THEMES as theme}
		<ThemePicker newTheme={theme} />
	{/each}
</div>
