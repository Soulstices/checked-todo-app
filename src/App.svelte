<script>
	import Header from './components/Header.svelte'
	import TaskCreator from './components/TaskCreator.svelte'
	import Task from './components/Task.svelte'
	import { encodedData, tasks, theme } from './store.js'
	import { onMount } from 'svelte'
	import { Base64 } from 'js-base64'

	const PAGE_URL = new URL(window.location.href)

	onMount(() => {
		initializeData()
		$theme = JSON.parse(localStorage.getItem('settings')).theme
	})

	function initializeData() {
		$encodedData = PAGE_URL.search.replace('?', '')

		if (containsValidData()) {
			loadTasksFromURL()
		} else {
			loadTasksFromStorage()
			saveInURL()
		}
	}

	function containsValidData() {
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

	function loadTasksFromURL() {
		let decodedData = JSON.parse('[' + Base64.decode($encodedData) + ']')
		clearTasksInStorage()

		for (const entry of decodedData) {
			localStorage.setItem(entry.id, JSON.stringify(entry))
		}

		loadTasksFromStorage()
	}

	function loadTasksFromStorage() {
		$tasks = Object.entries(localStorage)
			.filter(([key, _]) => key !== 'settings') // Exclude the "settings" entry
			.map((entry) => JSON.parse(entry[1]))
			.sort((a, b) => b.date - a.date)
	}

	function saveInURL() {
		let acc = $tasks.map((task) => JSON.stringify(task))
		$encodedData = Base64.encode(acc.toString())

		updateURL()
	}

	function updateURL() {
		let newURL = $encodedData.length > 0 ? `${PAGE_URL.origin}/?${$encodedData}` : PAGE_URL.origin
		history.pushState({}, null, newURL)
	}

	function clearTasksInStorage() {
		const settings = localStorage.getItem('settings')
		localStorage.clear()
		localStorage.setItem('settings', settings)
	}
</script>

<main class="min-h-full pt-4 md:pt-4 pb-2 px-4 md:px-0">
	<Header />
	<div class="max-w-lg mx-auto p-3 md:p-3 my-4 rounded-lg shadow-2xl bg-container">
		<section>
			<TaskCreator {saveInURL} />
			<section id="task-list">
				{#each $tasks as task}
					<Task {task} {saveInURL} />
				{/each}
			</section>
		</section>
	</div>
</main>
