<script lang="ts">
	import Header from './components/Header.svelte'
	import { onMount } from 'svelte'
	import { DEFAULT_THEME, THEMES, encodedData, tasks, theme, reverseTasksLayout } from './lib/store.js'
	import { compressToUTF16, decompressFromUTF16, compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
	import Footer from './components/Footer.svelte'
	import Container from './components/Container.svelte'
	import Task from './components/Task.svelte'
	import TaskCreator from './components/TaskCreator.svelte'
	import StickyBar from './components/StickyBar.svelte'
	import { IconType } from './lib/types'
	import Icon from './components/Icon.svelte'

	const PAGE_URL: URL = new URL(window.location.href)

	$: $reverseTasksLayout

	onMount<void>(() => {
		initializeApp()
	})

	function initializeApp(): void {
		$tasks = []

		const settingsGlobal = JSON.parse(String(localStorage.getItem('settings-global'))) || {}

		// Set to 'dark' theme by default if there is no data in localStorage
		if (!settingsGlobal.hasOwnProperty('theme') || !settingsGlobal.theme || !$THEMES.includes(settingsGlobal.theme)) {
			settingsGlobal.theme = $DEFAULT_THEME
			localStorage.setItem('settings-global', JSON.stringify(settingsGlobal))
			document.documentElement.setAttribute('data-theme', $DEFAULT_THEME)
		}

		// Set unreverseLayout to true by default
		if (!settingsGlobal.hasOwnProperty('unreverseLayout')) {
			settingsGlobal.unreverseLayout = true
			localStorage.setItem('settings-global', JSON.stringify(settingsGlobal))
		}

		// Load theme from localStorage
		$theme = JSON.parse(String(localStorage.getItem('settings-global')))?.theme

		$encodedData = PAGE_URL.search.replace('?', '')

		if (containsValidData()) {
			loadTasksFromURL()
		} else {
			loadTasksFromStorage()
			saveInURL()
		}

		// Load tasks layout setting
		if (!settingsGlobal.unreverseLayout === true) {
			$reverseTasksLayout = true
			$tasks.sort((a, b) => a.date - b.date)
		} else {
			$reverseTasksLayout = false
			$tasks.sort((a, b) => b.date - a.date)
		}
	}

	function containsValidData(): boolean {
		if (decompressFromEncodedURIComponent($encodedData) == null) {
			$encodedData = ''
			clearTasksInStorage()
			return false
		}

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
			.filter(([key, _]) => key !== 'settings-global') // Exclude the "settings-global" entry
			.map((entry) => JSON.parse(decompressFromUTF16(entry[1])))
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
		const settingsGlobal: string = String(localStorage.getItem('settings-global'))
		localStorage.clear()
		localStorage.setItem('settings-global', settingsGlobal)
	}
</script>

<StickyBar {saveInURL} />

<main class="min-h-full pt-4 md:pt-4 pb-2 px-4 md:px-0">
	<Header />
	<Container>
		{#if !$reverseTasksLayout}
			<TaskCreator {saveInURL} />
		{/if}
		{#if $tasks.length === 0}
			<div class="flex w-full">
				<div
					class="flex flex-row p-4 rounded-lg border form-check w-full transition duration-300 bg-task border-task text-task"
					class:mt-2={!$reverseTasksLayout}
					class:mb-2={$reverseTasksLayout}
				>
					<Icon type={IconType.ChatBubble} classNames="m-auto h-9 w-6 mr-2" />
					<span class="inline-block pl-1 pr-2 flex-1 mt-auto mb-auto wrap-anywhere transition duration-300">
						There are currently no tasks.
					</span>
				</div>
			</div>
		{/if}
		{#each $tasks as task}
			<Task {task} {saveInURL} />
		{/each}
		{#if $reverseTasksLayout}
			<TaskCreator {saveInURL} />
		{/if}
	</Container>
	<Footer />
</main>
