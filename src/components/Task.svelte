<script>
	import { tasks } from '../store.js'

	export let task = {}
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
		class:bg-gray-800={!task.isCompleted}
		class:border-gray-700={!task.isCompleted}
		class:bg-emerald-900={task.isCompleted}
		class:border-emerald-700={task.isCompleted}
	>
		<input
			class="form-check-input appearance-none h-4 w-4 border rounded-sm checked:after:m-[0.1rem] checked:after:ml-[0.275rem] checked:after:block checked:after:h-[0.5rem] checked:after:w-[0.35rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 bg-slate-600 checked:bg-green-700 checked:border-green-600 border-slate-500 focus:outline-none align-top bg-no-repeat bg-center bg-contain float-left mr-3 ml-1 cursor-pointer scale-150 mt-auto mb-auto"
			type="checkbox"
			bind:checked={task.isCompleted}
			on:click={() => {
				saveStatusInStorage()
				saveInURL()
			}}
		/>
		<span
			class=" inline-block pl-1 pr-2 flex-1 mt-auto mb-auto wrap-anywhere"
			class:text-gray-400={!task.isCompleted}
			class:text-green-300={task.isCompleted}
		>
			{task.text}
		</span>
		<button
			type="button"
			class="mt-auto mb-auto
		  bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-white

		  inline-block rounded-full leading-normal shadow-md
		  hover:shadow-lg focus:shadow-lg focus:outline-none border-none !outline-none focus:ring-0
		  active:shadow-lg transition duration-150 ease-in-out w-9 h-9"
			class:hover:bg-gray-800={task.isCompleted}
			on:click={() => {
				deleteTask()
			}}
		>
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 12 16"
				height="16px"
				width="16px"
				xmlns="http://www.w3.org/2000/svg"
				style="margin: auto;"
			>
				<path
					fill-rule="evenodd"
					d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6
		  6.52l3.75-3.75 1.48 1.48L7.48 8z"
					class=""
				></path></svg
			>
		</button>
	</div>
</div>
