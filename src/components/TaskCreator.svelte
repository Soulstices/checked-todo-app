<script lang="ts">
	import { type Task } from '../lib/types'
	import { tasks, useReversedLayout, isTaskCreatorTooltipOpen, isModalOpen } from '../lib/store.js'
	import { getContext } from 'svelte'
	import { generateUID, saveInStorage, autoScrollToBottom } from '../lib/utils'
	import { Plus } from 'lucide-svelte'

	let saveInURL: () => void = getContext('saveInURL')
	let currentText: string = ''

	function addTask(): void {
		if (!currentText) {
			$isTaskCreatorTooltipOpen = true
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
		$useReversedLayout ? $tasks.push(newTask) : $tasks.unshift(newTask)
		$tasks = $tasks
		saveInURL()

		if ($useReversedLayout) {
			autoScrollToBottom()
		}
	}

	function onKeyDown(e: KeyboardEvent): void {
		toggleTooltip(false)

		if ($useReversedLayout) {
			autoScrollToBottom()
		}

		if (e.key === 'Enter' || e.code === 'Enter') {
			addTask()
		}
	}

	function toggleTooltip(isOpen: boolean): void {
		$isTaskCreatorTooltipOpen = isOpen
	}
</script>

<div class="flex justify-center">
	<div class="mb-0 w-full relative inline-block z-20">
		<input
			type="text"
			name="task-text"
			class="input-task block w-full pl-3 pr-11 py-1.5 text-base font-normal bg-clip-padding border border-solid rounded ease-in-out m-0 focus:outline-none focus:ring-2 ring-blue-600/50 transition duration-300"
			placeholder="Enter a task"
			maxlength="100"
			autocomplete="off"
			tabindex={$isModalOpen ? -1 : 0}
			bind:value={currentText}
			on:keydown={(e) => {
				onKeyDown(e)
			}}
		/>
		<span
			class="absolute top-1/2 right-2 translate-y-[-50%]"
			class:hidden={currentText.length === 0}
			class:text-task={currentText.length < 100}
			class:font-bold={currentText.length === 100}
			class:text-red-600={currentText.length === 100}
		>
			{currentText.length}
		</span>
	</div>
	<div class="flex space-x-2 justify-center pl-1 z-20">
		<button
			type="button"
			aria-label="Create Task"
			class="inline-block px-6 py-2 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-2 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
			on:click={() => addTask()}
			tabindex={$isModalOpen ? -1 : 0}
		>
			<Plus strokeWidth="3" class="w-5 h-5" />
		</button>
	</div>
</div>

{#if $isTaskCreatorTooltipOpen}
	<div
		class="absolute text-red-500 bg-container border shadow-md border-red-700 mt-1 px-3 py-1 z-20 rounded text-sm font-bold"
		class:-translate-y-[75px]={$useReversedLayout}
	>
		<span>Fill this field before creating a new task.</span>
	</div>

	<button class="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900/50 z-10 cursor-default" tabindex="-1" on:click={() => toggleTooltip(false)} />
{/if}
