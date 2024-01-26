<script lang="ts">
	import { onMount } from 'svelte'
	import { useReversedLayout } from '../lib/store'

	export let title: string = 'Title'
	export let description: string = 'Description'
	export let settingName = 'settingName'
	export let updateInStorage = (value: boolean) => console.log(value)

	let isChecked: boolean = false

	function handleClick() {
		let settingsGlobal = JSON.parse(localStorage.getItem('settings-global') || 'null')
		settingsGlobal[settingName] = !isChecked
		updateInStorage(settingsGlobal[settingName])
		localStorage.setItem('settings-global', JSON.stringify(settingsGlobal))
	}

	onMount(() => {
		let settingsGlobal = JSON.parse(localStorage.getItem('settings-global') || 'null')
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
		<input type="checkbox" value="" class="sr-only peer" bind:checked={isChecked} on:click={handleClick} />
		<span
			class="w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-toggle-slider after:rounded-full after:h-5 after:w-5 after:transition-all
			  {isChecked ? 'bg-toggle-active' : 'bg-toggle'}"
		/>
	</label>
</div>
