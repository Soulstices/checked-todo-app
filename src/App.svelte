<script lang="ts">
	import Header from './components/Header.svelte'
	import { onMount, setContext } from 'svelte'
	import { tasks, theme, useReversedLayout, useSmoothScroll, EXPERIMENTAL_FEATURES, isElectronApp } from './lib/store.js'
	import { compressToUTF16, decompressFromUTF16, compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
	import Footer from './components/Footer.svelte'
	import Container from './components/Container.svelte'
	import Task from './components/Task.svelte'
	import TaskCreator from './components/TaskCreator.svelte'
	import StickyBar from './components/StickyBar.svelte'
	import { IconType, type SettingsGlobal, Theme } from './lib/types'
	import Icon from './components/Icon.svelte'
	import TasksImporter from './components/TasksImporter.svelte'

	let encodedData: string = ''
	const PAGE_URL: URL = new URL(window.location.href)

	onMount(() => {
		initializeApp()
	})

	setContext('saveInURL', saveInURL)
	setContext('getSettingsGlobalFromStorage', getSettingsGlobalFromStorage)
	setContext('saveSettingsGlobalInStorage', saveSettingsGlobalInStorage)
	setContext('loadTasksFromURL', loadTasksFromURL)

	function initializeApp(): void {
		$tasks = []
		encodedData = PAGE_URL.search.replace('?', '')

		detectElectronEnv()
		loadSettingsFromStorage()

		if (urlContainsValidData()) {
			loadTasksFromURL(encodedData)
		} else {
			loadTasksFromStorage()
			saveInURL()
		}

		subscribeToSettings()
	}

	function urlContainsValidData(): boolean {
		if (encodedData !== '' && decompressFromEncodedURIComponent(encodedData) == null) {
			encodedData = ''
			clearTasksInStorage()
			return false
		}

		if (PAGE_URL.search.length > 0) {
			try {
				JSON.parse('[' + decompressFromEncodedURIComponent(encodedData) + ']')
			} catch (e) {
				encodedData = ''
				clearTasksInStorage()
				return false
			}
			return true
		} else {
			return false
		}
	}

	function loadTasksFromURL(data: string): void {
		let decodedData = JSON.parse('[' + decompressFromEncodedURIComponent(data) + ']')
		clearTasksInStorage()

		for (const entry of decodedData) {
			localStorage.setItem(entry.id, compressToUTF16(JSON.stringify(entry)))
		}

		loadTasksFromStorage()
	}

	function loadTasksFromStorage(): void {
		const exclusionKeys = ['settings', 'settings-global', 'settings-local']

		$tasks = Object.entries(localStorage)
			.filter(([key, _]) => !exclusionKeys.includes(key))
			.map((entry) => JSON.parse(decompressFromUTF16(entry[1])))
		sortTasksByDate($useReversedLayout)
	}

	function saveInURL(): void {
		let acc = $tasks.map((task) => JSON.stringify(task))
		encodedData = compressToEncodedURIComponent(acc.toString())
		updateURL()
	}

	function updateURL(): void {
		let newURL: string = encodedData.length > 1 ? `${PAGE_URL.origin}/?${encodedData}` : PAGE_URL.origin
		history.pushState({}, '', newURL)
	}

	function clearTasksInStorage(): void {
		const settings: SettingsGlobal = getSettingsGlobalFromStorage()
		localStorage.clear()
		saveSettingsGlobalInStorage(settings)
	}

	function loadSettingsFromStorage(): void {
		let settings: SettingsGlobal = getSettingsGlobalFromStorage()

		if (settings.hasOwnProperty('theme')) {
			const themeValues: Theme[] = Object.values(Theme)
			themeValues.includes(settings.theme as Theme) ? ($theme = settings.theme as Theme) : (settings.theme = $theme)
		} else {
			settings.theme = $theme
		}
		document.documentElement.setAttribute('data-theme', settings.theme)

		settings.hasOwnProperty('useReversedLayout')
			? ($useReversedLayout = settings.useReversedLayout)
			: (settings.useReversedLayout = $useReversedLayout)

		settings.hasOwnProperty('useSmoothScroll') ? ($useSmoothScroll = settings.useSmoothScroll) : (settings.useSmoothScroll = $useSmoothScroll)

		saveSettingsGlobalInStorage(settings)
	}

	function subscribeToSettings(): void {
		useReversedLayout.subscribe((isEnabled: boolean) => {
			sortTasksByDate(isEnabled)
		})

		useSmoothScroll.subscribe((isEnabled: boolean) => {
			if (isEnabled) {
				document.documentElement.classList.add('scroll-smooth')
			} else {
				document.documentElement.classList.remove('scroll-smooth')
			}
		})

		theme.subscribe((theme) => {
			const settings: SettingsGlobal = getSettingsGlobalFromStorage()
			settings.theme = theme
			document.documentElement.setAttribute('data-theme', settings.theme)
			saveSettingsGlobalInStorage(settings)
		})
	}

	function sortTasksByDate(ascending: boolean) {
		if (ascending === true) {
			$tasks.sort((a, b) => a.date - b.date)
		} else {
			$tasks.sort((a, b) => b.date - a.date)
		}
	}

	function getSettingsGlobalFromStorage(): SettingsGlobal {
		let settingsGlobal: SettingsGlobal

		try {
			const storedValue = localStorage.getItem('settings-global')
			settingsGlobal = storedValue ? JSON.parse(storedValue) : null

			if (!settingsGlobal) {
				settingsGlobal = getDefaultSettingsGlobal()
			}
		} catch (error) {
			console.error('Error parsing settings-global JSON from local storage:', error)
			settingsGlobal = getDefaultSettingsGlobal()
		}

		return settingsGlobal
	}

	function saveSettingsGlobalInStorage(value: SettingsGlobal): void {
		localStorage.setItem('settings-global', JSON.stringify(value))
	}

	function getDefaultSettingsGlobal(): SettingsGlobal {
		return {
			theme: $theme,
			useReversedLayout: $useReversedLayout,
			useSmoothScroll: $useSmoothScroll,
		}
	}

	function detectElectronEnv(): void {
		$isElectronApp =
			(typeof window !== 'undefined' && (window.process as any)?.type === 'renderer') ||
			(typeof process !== 'undefined' && (process as any).versions?.electron) ||
			(typeof navigator === 'object' && navigator.userAgent.includes('Electron'))
	}
</script>

<main class="min-h-full pt-4 md:pt-4 pb-2 px-4 md:px-0">
	<Header />
	<Container>
		{#if !$useReversedLayout}
			<TaskCreator />
		{/if}
		{#if $tasks.length === 0}
			<div class="flex w-full">
				<div
					class="flex flex-row p-4 rounded-lg border form-check w-full transition duration-300 bg-task border-task text-task
							 {$useReversedLayout ? 'mb-2' : 'mt-2'}"
				>
					<Icon type={IconType.ChatBubble} classNames="m-auto h-9 w-6 mr-2" />
					<span class="inline-block pl-1 pr-2 flex-1 mt-auto mb-auto wrap-anywhere transition duration-300">
						There are currently no tasks.
					</span>
				</div>
			</div>
			{#if $EXPERIMENTAL_FEATURES}
				<TasksImporter />
			{/if}
		{/if}
		{#each $tasks as task (task.id)}
			<Task {task} />
		{/each}
		{#if $useReversedLayout}
			<TaskCreator />
		{/if}
	</Container>
	<Footer />

	<StickyBar />
</main>
