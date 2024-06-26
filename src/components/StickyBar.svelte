<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte'
	import { tasks, isModalOpen, activeTabIndex, isTaskCreatorTooltipOpen, useReversedLayout } from '../lib/store.js'
	import Modal from './Modal.svelte'
	import { scrollToBottom, scrollToTop } from '../lib/utils'
	import { ArrowDown, ArrowUp, Check, Link, Trash2, X } from 'lucide-svelte'

	let isAtTop: boolean = true
	let isAtBottom: boolean = true
	let isLinkCopied: boolean = false
	let completedCount: number = 0
	let scrollDetectionInterval: NodeJS.Timeout
	const scrollOffset: number = 100
	const saveInURL: () => void = getContext('saveInURL')

	$: completedCount = $tasks.filter((item) => item.isCompleted).length

	function deleteAllTasks() {
		$tasks = []

		const settingsGlobal = localStorage.getItem('settings-global')
		localStorage.clear()
		if (settingsGlobal) {
			localStorage.setItem('settings-global', settingsGlobal)
		}

		saveInURL()
		closeModal()
	}

	function closeModal() {
		$isModalOpen = false
	}

	function handleShareBtnClick() {
		navigator.clipboard.writeText(window.location.href).then(() => {
			isLinkCopied = true
			setTimeout(() => {
				isLinkCopied = false
			}, 3000)
		})
	}

	onMount(() => {
		scrollDetectionInterval = setInterval(() => {
			isAtTop = window.scrollY < scrollOffset
			isAtBottom = window.scrollY >= document.documentElement.scrollHeight - window.innerHeight - scrollOffset
		}, 300)
	})

	onDestroy(() => {
		clearInterval(scrollDetectionInterval)
	})
</script>

{#if $isModalOpen}
	<Modal title="Tasks Deletion" titleIcon="trash">
		Do you really want to delete all your tasks?
		<div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 pt-5">
			<button
				class="flex items-center p-2 rounded w-full border-2 duration-200 bg-themepicker border-themepicker text-warning-red"
				on:click={deleteAllTasks}
			>
				<Check strokeWidth="3" />
				<span class="uppercase pl-3 pr-1 tracking-wider pt-[1px] font-bold">Yes, Delete All Tasks</span>
			</button>
			<button class="flex flex-row items-center p-2 rounded w-full border-2 duration-200 bg-themepicker border-themepicker" on:click={closeModal}>
				<X strokeWidth="3" />
				<span class="uppercase pl-3 pr-1 tracking-wider pt-[1px] text-task font-bold">No, Cancel</span>
			</button>
		</div>
	</Modal>
{/if}

{#if $tasks.length > 0 && $activeTabIndex === 0}
	<div
		class="fixed bottom-0 bg-container left-1/2 translate-x-[-50%] border-task flex w-full items-center py-4 text-task max-w-lg
				{$isTaskCreatorTooltipOpen ? 'z-0' : 'z-20'}"
		class:hidden={$isTaskCreatorTooltipOpen && $useReversedLayout}
	>
		<progress
			value={completedCount}
			max={$tasks.length}
			class="absolute -top-1 right-0 left-0 w-full h-1 {completedCount !== $tasks.length ? 'progress-blue' : 'progress-green'}"
		/>

		<button
			aria-label="Scroll To Top"
			on:click={scrollToTop}
			class="absolute left-3 bg-themepicker duration-200 px-1 h-8 w-8 rounded-l"
			class:opacity-50={isAtTop}
			tabindex={$isModalOpen ? -1 : 0}
			disabled={isAtTop}
			style="  touch-action: manipulation;
"
		>
			<ArrowUp
				strokeWidth="3"
				class="h-5 w-5 m-auto"
			>
			</ArrowUp>
		</button>
		<button
			aria-label="Scroll To Bottom"
			on:click={scrollToBottom}
			class="absolute left-[45px] bg-themepicker duration-200 px-1 h-8 w-8 rounded-r"
			class:opacity-50={isAtBottom}
			tabindex={$isModalOpen ? -1 : 0}
			disabled={isAtBottom}
			style="  touch-action: manipulation !important;
"
		>
			<ArrowDown
				strokeWidth="3"
				class="h-5 w-5 m-auto"
			>
			</ArrowDown>
		</button>
		<div class="m-auto">
			<span class="font-bold hidden md:inline-block">Tasks:</span>
			<span class:text-task-completed={completedCount === $tasks.length} class:font-bold={completedCount === $tasks.length}>
				{completedCount}/{$tasks.length}
			</span>
		</div>
		<button
			aria-label="Share"
			on:click={handleShareBtnClick}
			class="absolute right-[45px] bg-themepicker duration-200 px-2 h-8 w-[90px] rounded-l flex flex-row"
			class:opacity-70={isLinkCopied}
			tabindex={$isModalOpen ? -1 : 0}
			disabled={isLinkCopied}
		>
			<Link strokeWidth="2.5" class="w-4 h-4 my-auto" />
			<span class="m-auto pl-2 pr-1 uppercase text-xs font-bold">
				{#if !isLinkCopied}
					Share
				{:else}
					Copied
				{/if}
			</span>
		</button>
		<button
			aria-label="Delete All Tasks"
			on:click={() => ($isModalOpen = true)}
			class="absolute right-3 bg-themepicker duration-200 px-2 h-8 w-8 rounded-r hover:text-warning-red"
			tabindex={$isModalOpen ? -1 : 0}
		>
			<Trash2 strokeWidth="2.5" class="m-auto h-4 w-4"></Trash2>
		</button>
	</div>
{/if}
