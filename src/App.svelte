<script>
	import Header from './components/Header.svelte'
	import TaskCreator from './components/TaskCreator.svelte'
	import Task from './components/Task.svelte'
	import { encodedData, tasks } from './store.js'
	import { onMount } from 'svelte'
	import { Base64 } from 'js-base64'

	const PAGE_URL = new URL(window.location.href)

	onMount(() => {
		// Obtain data from URL
		$encodedData = PAGE_URL.search.replace('?', '')

		if (containsValidData()) {
			let decodedData = JSON.parse('[' + Base64.decode($encodedData) + ']')
			localStorage.clear()

			// Load data from URL into local storage
			for (const entry of decodedData) {
				localStorage.setItem(entry.id, JSON.stringify(entry))
			}

			loadTasksFromStorage()
		} else {
			loadTasksFromStorage()
			saveInURL()
		}
	})

	function containsValidData() {
		if (PAGE_URL.search.length > 0) {
			try {
				JSON.parse('[' + Base64.decode($encodedData) + ']')
			} catch (e) {
				$encodedData = ''
				localStorage.clear()
				return false
			}
			return true
		} else {
			return false
		}
	}

	function loadTasksFromStorage() {
		for (const entry of Object.entries(localStorage)) {
			$tasks.unshift(JSON.parse(entry[1]))
			$tasks.sort((a, b) => b.date - a.date)
			$tasks = $tasks
		}
	}

	function saveInURL() {
		let acc = []

		for (const task of $tasks) {
			acc.push(JSON.stringify(task))
		}

		$encodedData = Base64.encode(acc.toString())

		updateURL()
	}

	function updateURL() {
		let newURL
		if ($encodedData.length > 0) {
			newURL = PAGE_URL.origin + '/?' + $encodedData
		} else {
			newURL = PAGE_URL.origin
		}
		history.pushState({}, null, newURL)
	}
</script>

<main class="min-h-screen pt-4 md:pt-4 pb-2 px-4 md:px-0 body-bg-dark">
	<Header />

	<div class="max-w-lg mx-auto p-3 md:p-3 my-4 rounded-lg shadow-2xl bg-slate-900">
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
