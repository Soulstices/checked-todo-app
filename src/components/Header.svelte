<script>
	import { isModalOpen } from '../store.js'
	import SettingsModal from './Settings.svelte'
	import Icon from './Icon.svelte'
</script>

<SettingsModal />

<header class="max-w-lg mx-auto flex flex-row pr-3 pl-3 pt-2 pb-1">
	<h1 class="text-2xl font-bold text-white flex-1">To-Do App</h1>
	<button
		type="button"
		class="inline-block rounded border border-slate-700 bg-slate-800 hover:bg-gray-700 text-white leading-normal uppercase shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg ease-in-out w-9 h-9 !outline-none duration-150"
		on:click={() => {
			$isModalOpen = true
		}}
	>
		<Icon type="settings" classNames="w-5 h-5 m-auto" />
	</button>
</header>
