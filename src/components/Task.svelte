<script lang="ts">
	import { IconType, type Task } from '../lib/types'
	import Icon from './Icon.svelte'
	import { isModalOpen, tasks, useReversedLayout } from '../lib/store.js'
	import { compressToUTF16 } from 'lz-string'
	import { fade } from 'svelte/transition'
	import { getContext } from 'svelte'

	export let task: Task
	let saveInURL: () => void = getContext('saveInURL')

	function handleCheckboxClick() {
		saveStatusInStorage()
		saveInURL()
	}

	function deleteTask(): void {
		$tasks.splice(
			$tasks.findIndex((element: Task) => element.id === task.id),
			1
		)
		deleteFromStorage()
		$tasks = $tasks
		saveInURL()
	}

	function deleteFromStorage(): void {
		localStorage.removeItem(task.id)
	}

	function saveStatusInStorage(): void {
		task.isCompleted = !task.isCompleted
		localStorage.setItem(task.id, compressToUTF16(JSON.stringify(task)))
		$tasks = $tasks
	}
</script>

<div class="flex w-full" in:fade={{ duration: 200 }}>
	<div
		class="flex flex-row p-4 rounded-lg border form-check w-full transition duration-200
		{task.isCompleted ? 'bg-task-completed border-task-completed' : 'bg-task border-task'}
		{$useReversedLayout ? 'mb-2' : 'mt-2'}"
	>
		<input
			aria-label="Task's Checkbox"
			name="task-checkbox"
			class="form-check-input appearance-none h-4 w-4 border rounded-sm checked:after:m-[0.1rem] checked:after:ml-[0.275rem] checked:after:block checked:after:h-[0.5rem] checked:after:w-[0.35rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checkbox focus:outline-2 align-top bg-no-repeat bg-center bg-contain float-left mr-3 ml-1 cursor-pointer scale-[1.4] mt-auto mb-auto transition duration-200"
			type="checkbox"
			tabindex={$isModalOpen ? -1 : 0}
			bind:checked={task.isCompleted}
			on:keydown={(event) => {
				if (event.key === 'Enter') {
					event.preventDefault()
					handleCheckboxClick()
				}
			}}
			on:click={handleCheckboxClick}
		/>
		<span
			class="inline-block pl-1 pr-2 flex-1 mt-auto mb-auto wrap-anywhere transition duration-200
			{task.isCompleted ? 'text-task-completed' : 'text-task'}"
		>
			{task.text}
		</span>
		<button
			type="button"
			aria-label="Delete Task"
			class="mt-auto mb-auto text-remove hover:text-white inline-block rounded-full leading-normal shadow-md hover:shadow-lg focus:shadow-lg focus:outline-2 border-none focus:ring-0 active:shadow-lg ease-in-out w-9 h-9 transition duration-200
			 {task.isCompleted ? 'bg-btn-3' : 'bg-btn-2'}"
			tabindex={$isModalOpen ? -1 : 0}
			on:click={() => {
				deleteTask()
			}}
		>
			<Icon type={IconType.Cross} classNames="h-4 w-4 m-auto" />
		</button>
	</div>
</div>
