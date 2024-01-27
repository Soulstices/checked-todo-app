<script lang="ts">
	import { getContext, onMount } from 'svelte'
	import type { BooleanKeys, SettingsGlobal } from '../lib/types'
	import { useReversedLayout, useSmoothScroll } from '../lib/store'

	export let title: string = 'Title'
	export let description: string = 'Description'
	export let settingName: BooleanKeys<SettingsGlobal> = 'useReversedLayout'

	let getSettingsGlobalFromStorage: () => SettingsGlobal = getContext('getSettingsGlobalFromStorage')
	let saveSettingsGlobalInStorage: (value: SettingsGlobal) => void = getContext('saveSettingsGlobalInStorage')

	let isChecked: boolean = false

	const settingsMap = {
		useReversedLayout,
		useSmoothScroll,
	}

	function handleClick() {
		let settingsGlobal: SettingsGlobal = getSettingsGlobalFromStorage()
		settingsGlobal[settingName] = !isChecked
		settingsMap[settingName].set(!isChecked)
		saveSettingsGlobalInStorage(settingsGlobal)
	}

	onMount(() => {
		let settingsGlobal: SettingsGlobal = getSettingsGlobalFromStorage()
		isChecked = settingsGlobal[settingName]
	})
</script>

<div class="flex flex-row pb-5">
	<div class="flex flex-col">
		<p class="font-bold text-md ml-2 text-modal">{title}</p>
		<p class=" text-sm font-medium ml-2 text-task pr-3">
			{description}
		</p>
	</div>

	<label class="relative inline-flex items-center cursor-pointer m-auto">
		<input type="checkbox" value="" class="sr-only peer" bind:checked={isChecked} on:click={handleClick} tabindex="-1" />
		<button
			class="w-11 h-6 disable-pointer-events hover:outline-2 group rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-toggle-slider after:rounded-full after:h-5 after:w-5 after:transition-all
        {isChecked ? 'bg-toggle-active' : 'bg-toggle'}"
			on:keydown={(event) => {
				if (event.key === 'Enter') {
					handleClick()
					isChecked = !isChecked
				}
			}}
		/>
	</label>
</div>
