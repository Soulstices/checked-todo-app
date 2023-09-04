<script lang="ts">
	import Header from './components/Header.svelte'
	import TaskCreator from './components/TaskCreator.svelte'
	import Task from './components/Task.svelte'
	import { onMount } from 'svelte'
	import { encodedData, isModalOpen, tasks, theme } from './lib/store.js'
	import { compressToUTF16, decompressFromUTF16, compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
	import Icon from './components/Icon.svelte'
	import Footer from './components/Footer.svelte'

	const PAGE_URL: URL = new URL(window.location.href)

	onMount<void>(() => {
		initializeApp()
	})

	function initializeApp(): void {
		$tasks = []

		const settings = JSON.parse(String(localStorage.getItem('settings'))) || {}

		// Set to 'dark' theme by default if there is no data in localStorage
		if (!settings.hasOwnProperty('theme') || !settings.theme) {
			settings.theme = 'dark-blue'
			localStorage.setItem('settings', JSON.stringify(settings))
		}

		// Load theme from localStorage
		$theme = JSON.parse(String(localStorage.getItem('settings')))?.theme
		$encodedData = PAGE_URL.search.replace('?', '')

		if (containsValidData()) {
			loadTasksFromURL()
		} else {
			loadTasksFromStorage()
			saveInURL()
		}
	}

	function containsValidData(): boolean {
		if (PAGE_URL.search.length > 0) {
			try {
				JSON.parse('[' + decompressFromEncodedURIComponent($encodedData) + ']')
			} catch (e) {
				$encodedData = ''
				clearTasksInStorage()
				return false
			}
			return true
		} else {
			return false
		}
	}

	function loadTasksFromURL(): void {
		let decodedData = JSON.parse('[' + decompressFromEncodedURIComponent($encodedData) + ']')
		clearTasksInStorage()

		for (const entry of decodedData) {
			localStorage.setItem(entry.id, compressToUTF16(JSON.stringify(entry)))
		}

		loadTasksFromStorage()
	}

	function loadTasksFromStorage(): void {
		$tasks = Object.entries(localStorage)
			.filter(([key, _]) => key !== 'settings') // Exclude the "settings" entry
			.map((entry) => JSON.parse(decompressFromUTF16(entry[1])))
			.sort((a, b) => b.date - a.date)
	}

	function saveInURL(): void {
		let acc = $tasks.map((task) => JSON.stringify(task))
		$encodedData = compressToEncodedURIComponent(acc.toString())
		updateURL()
	}

	function updateURL(): void {
		let newURL: string = $encodedData.length > 0 ? `${PAGE_URL.origin}/?${$encodedData}` : PAGE_URL.origin
		history.pushState({}, '', newURL)
	}

	function clearTasksInStorage(): void {
		const settings: string = String(localStorage.getItem('settings'))
		localStorage.clear()
		localStorage.setItem('settings', settings)
	}
</script>

<main class="min-h-full pt-4 md:pt-4 pb-2 px-4 md:px-0">
	<Header />

	<div class="max-w-lg m-auto">
		<button
			type="button"
			class="flex ml-auto mx-3 rounded-t bg-black/30 hover:bg-black/50 text-white/80 hover:text-white leading-normal uppercase shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg ease-in-out w-9 h-9 !outline-none duration-150"
			on:click={() => {
				$isModalOpen = true
			}}
		>
			<Icon type="settings" classNames="w-5 h-5 m-auto" />
		</button>
	</div>

	<div class="max-w-lg mx-auto p-3 md:p-3 my-4 mt-0 rounded-lg shadow-md bg-container transition duration-300">
		<TaskCreator {saveInURL} />
		{#each $tasks as task}
			<Task {task} {saveInURL} />
		{/each}
	</div>

	<Footer />
</main>
