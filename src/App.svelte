<script lang="ts">
	import Header from './components/Header.svelte'
	import { onMount } from 'svelte'
	import { DEFAULT_THEME, THEMES, encodedData, tasks, theme } from './lib/store.js'
	import { compressToUTF16, decompressFromUTF16, compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
	import Footer from './components/Footer.svelte'
	import Container from './components/Container.svelte'
	import Task from './components/Task.svelte'
	import TaskCreator from './components/TaskCreator.svelte'

	const PAGE_URL: URL = new URL(window.location.href)

	onMount<void>(() => {
		initializeApp()
	})

	function initializeApp(): void {
		$tasks = []

		const settings = JSON.parse(String(localStorage.getItem('settings'))) || {}

		// Set to 'dark' theme by default if there is no data in localStorage
		if (!settings.hasOwnProperty('theme') || !settings.theme || !$THEMES.includes(settings.theme)) {
			settings.theme = $DEFAULT_THEME
			localStorage.setItem('settings', JSON.stringify(settings))
			document.documentElement.setAttribute('data-theme', $DEFAULT_THEME)
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
		let newURL: string = $encodedData.length > 1 ? `${PAGE_URL.origin}/?${$encodedData}` : PAGE_URL.origin
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
	<Container>
		<TaskCreator {saveInURL} />
		{#each $tasks as task}
			<Task {task} {saveInURL} />
		{/each}
	</Container>
	<Footer />
</main>
