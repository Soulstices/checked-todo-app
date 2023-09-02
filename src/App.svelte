<script lang="ts">
	import Header from './components/Header.svelte'
	import TaskCreator from './components/TaskCreator.svelte'
	import Task from './components/Task.svelte'
	import { onMount } from 'svelte'
	import { Base64 } from 'js-base64'
	import { encodedData, tasks, theme } from './lib/store.js'

	const PAGE_URL: URL = new URL(window.location.href)

	onMount<void>(() => {
		initializeApp()
	})

	function initializeApp(): void {
		$tasks = []
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
				JSON.parse('[' + Base64.decode($encodedData) + ']')
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
		let decodedData = JSON.parse('[' + Base64.decode($encodedData) + ']')
		clearTasksInStorage()

		for (const entry of decodedData) {
			localStorage.setItem(entry.id, JSON.stringify(entry))
		}

		loadTasksFromStorage()
	}

	function loadTasksFromStorage(): void {
		$tasks = Object.entries(localStorage)
			.filter(([key, _]) => key !== 'settings') // Exclude the "settings" entry
			.map((entry) => JSON.parse(String(entry[1])))
			.sort((a, b) => b.date - a.date)
	}

	function saveInURL(): void {
		let acc = $tasks.map((task) => JSON.stringify(task))
		$encodedData = Base64.encode(acc.toString())

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
	<div class="max-w-lg mx-auto p-3 md:p-3 my-4 rounded-lg shadow-2xl bg-container">
		<TaskCreator {saveInURL} />
		{#each $tasks as task}
			<Task {task} {saveInURL} />
		{/each}
	</div>
</main>
