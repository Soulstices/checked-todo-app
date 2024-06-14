<script lang="ts">
	import ThemePicker from './ThemePicker.svelte'
	import SettingToggle from './SettingToggle.svelte'
	import { Theme } from '../lib/types'

	const themes: Theme[] = Object.values(Theme)

	function resetSettings() {
		history.scrollRestoration = 'manual'
		localStorage.removeItem('settings-global')
		location.reload()
	}
</script>

<div class="m-1">
	<p class="font-bold text-xl ml-2 text-modal pb-5">Settings</p>

	<p class="text-modal font-bold text-md ml-2 mb-1">Theme</p>
	<div class="flex flex-col md:grid md:grid-cols-2 items-center text-lg font-bold gap-4 pb-4">
		{#each themes as theme}
			<ThemePicker newTheme={theme} />
		{/each}
	</div>

	<SettingToggle
		title="Smooth Scrolling"
		description={`Clicking on the "Scroll to Top" or "Scroll to Bottom" buttons will smoothly scroll the page, instead of scrolling instantly.`}
		settingName="useSmoothScroll"
	/>

	<SettingToggle
		title="Reverse Tasks Layout"
		description={`By default, new tasks are displayed at the top. When the option is enabled, new tasks will instead appear at the bottom.`}
		settingName="useReversedLayout"
	/>

	<div class="flex justify-center">
		<button
			class="flex flex-row items-center py-2 px-3 rounded max-w-80 border-2 duration-200 bg-themepicker border-themepicker text-task uppercase font-bold text-xs"
			on:click={resetSettings}
		>
			Reset Settings
		</button>
	</div>
</div>
