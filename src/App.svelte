<script>
	import Header from './components/Header.svelte'
	import TaskCreator from './components/TaskCreator.svelte'
	import Task from './components/Task.svelte'
	import { tasks } from './store.js'
	import { onMount } from 'svelte'

	onMount(() => {
		for (const entry of Object.entries(localStorage)) {
			$tasks.unshift(JSON.parse(entry[1]))
			$tasks.sort((a, b) => b.date - a.date)
			$tasks = $tasks
		}
	})
</script>

<main class="min-h-screen pt-4 md:pt-4 pb-2 px-4 md:px-0 body-bg-dark">
	<Header />

	<div class="max-w-lg mx-auto p-3 md:p-3 my-4 rounded-lg shadow-2xl bg-slate-900">
		<section>
			<TaskCreator />
			<section id="task-list">
				{#each $tasks as task}
					<Task {task} />
				{/each}
			</section>
		</section>
	</div>
</main>
