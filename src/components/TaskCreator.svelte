<script lang="ts">
	import type { Task } from '../lib/types'
	import { tasks } from '../lib/store'

	export let saveInURL = () => {}
	let currentText: string

	function generateUID(): string {
		return Date.now().toString(36) + Math.random().toString(36).substring(2)
	}

	function addTask(): void {
		if (currentText === '') {
			return
		}

		let newTask: Task = {
			id: generateUID(),
			text: currentText,
			isCompleted: false,
			date: Date.now(),
		}

		currentText = ''
		saveInStorage(newTask)
		$tasks.unshift(newTask)
		$tasks = $tasks
		saveInURL()
	}

	function saveInStorage(task: Task): void {
		localStorage.setItem(task.id, JSON.stringify(task))
	}

	function onKeyDown(e: KeyboardEvent): void {
		{
			switch (e.code) {
				case 'Enter':
					addTask()
					break
			}
		}
	}
</script>

<div class="flex justify-center">
	<div class="mb-0 w-full">
		<input
			type="text"
			class="input-task form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid rounded ease-in-out m-0 focus:outline-none"
			id="exampleFormControlInput1"
			placeholder="Enter a task"
			autocomplete="off"
			bind:value={currentText}
			on:keydown={(e) => {
				onKeyDown(e)
			}}
		/>
	</div>
	<div class="flex space-x-2 justify-center pl-1">
		<button
			type="button"
			class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out !outline-none"
			on:click={() => addTask()}
		>
			Add
		</button>
	</div>
</div>
