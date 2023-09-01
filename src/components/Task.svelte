<script lang="ts">
	import { tasks } from '../store.js'
	import Icon from './Icon.svelte'

	export let task: {
		id: string
		text: string
		isCompleted: boolean
		date: number
	}
	export let saveInURL = () => {}

	function deleteTask() {
		$tasks.splice(
			$tasks.findIndex((element) => element.id === task.id),
			1
		)
		deleteFromStorage()
		$tasks = $tasks
		saveInURL()
	}

	function deleteFromStorage() {
		localStorage.removeItem(task.id)
	}

	function saveStatusInStorage() {
		task.isCompleted = !task.isCompleted
		localStorage.setItem(task.id, JSON.stringify(task))
	}
</script>

<div class="flex w-full">
	<div
		class="flex flex-row mt-2 p-4 rounded-lg border form-check w-full"
		class:bg-task={!task.isCompleted}
		class:border-task={!task.isCompleted}
		class:bg-task-completed={task.isCompleted}
		class:border-task-completed={task.isCompleted}
	>
		<input
			class="form-check-input appearance-none h-4 w-4 border rounded-sm checked:after:m-[0.1rem] checked:after:ml-[0.275rem] checked:after:block checked:after:h-[0.5rem] checked:after:w-[0.35rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checkbox focus:outline-none align-top bg-no-repeat bg-center bg-contain float-left mr-3 ml-1 cursor-pointer scale-150 mt-auto mb-auto"
			type="checkbox"
			bind:checked={task.isCompleted}
			on:click={() => {
				saveStatusInStorage()
				saveInURL()
			}}
		/>
		<span
			class=" inline-block pl-1 pr-2 flex-1 mt-auto mb-auto wrap-anywhere"
			class:text-task={!task.isCompleted}
			class:text-task-completed={task.isCompleted}
		>
			{task.text}
		</span>
		<button
			type="button"
			class="mt-auto mb-auto
		   text-remove hover:text-white

		  inline-block rounded-full leading-normal shadow-md
		  hover:shadow-lg focus:shadow-lg focus:outline-none border-none !outline-none focus:ring-0
		  active:shadow-lg transition duration-200 ease-in-out w-9 h-9"
			class:bg-btn-3={task.isCompleted}
			class:bg-btn-2={!task.isCompleted}
			on:click={() => {
				deleteTask()
			}}
		>
			<Icon type="cross" classNames="h-4 w-4 m-auto" />
		</button>
	</div>
</div>
