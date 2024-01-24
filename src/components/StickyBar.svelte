<script lang="ts">
	import { onMount } from 'svelte';
	import { tasks, isModalOpen, activeTabIndex, isTaskCreatorTooltipOpen, reverseTasksLayout } from '../lib/store.js'
	import Modal from './Modal.svelte'
	import Icon from './Icon.svelte'
	import { IconType } from '../lib/types'

	let isAtTop: boolean = true;
	let completedCount: number;

	export let saveInURL = () => {}

	$: {
		completedCount = $tasks.filter(item => item.isCompleted).length;
	}

	function scrollToTop(): void {
		window.scroll(0, 0);
	}

	function updateScrollPosition() {
		isAtTop = window.scrollY < 100;
	}

	function deleteAllTasks() {
		$tasks = []

		const settings = localStorage.getItem('settings');
		localStorage.clear()
		if (settings) {
			localStorage.setItem('settings', settings)
		}

		saveInURL()
		closeModal()
	}

	function closeModal() {
		$isModalOpen = false
	}

	onMount(() => {
		window.addEventListener('scroll', updateScrollPosition);
	});
</script>

<Modal title="Tasks Deletion" titleIcon={IconType.Trash}>
	Do you really want to delete all your tasks?
	<div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0 pt-5">
		<button
			class="flex items-center p-2 rounded w-full border-2 duration-200 bg-themepicker border-themepicker text-red-600"
			on:click={deleteAllTasks}
		>
			<Icon type={IconType.Check}></Icon>
			<span class="uppercase pl-3 pr-1 tracking-wider pt-[1px] font-bold">Yes, Delete All Tasks</span>
		</button>
		<button
			class="flex flex-row items-center p-2 rounded w-full border-2 duration-200 bg-themepicker border-themepicker"
			on:click={closeModal}
		>
			<Icon type={IconType.Cross}></Icon>
			<span class="uppercase pl-3 pr-1 tracking-wider pt-[1px] text-task font-bold">No, Cancel</span>
		</button>
	</div>
</Modal>

{#if $tasks.length > 0 && $activeTabIndex === 0 }
	<div class="fixed bottom-0 bg-container left-1/2 translate-x-[-50%] border-task  rounded-t flex w-full items-center py-4 text-task max-w-lg"
		  class:z-30={!$isTaskCreatorTooltipOpen}
		  class:z-10={$isTaskCreatorTooltipOpen}
		  class:hidden={$isTaskCreatorTooltipOpen && $reverseTasksLayout}>
		<button on:click={scrollToTop} class="absolute left-3 bg-themepicker duration-200 px-2 h-8 w-8 rounded" class:opacity-50={isAtTop} disabled={isAtTop}>
			<svg data-slot="icon" fill="none" stroke-width="6" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"></path>
			</svg>
		</button>
		<div class="m-auto">
			<span class="font-bold hidden md:inline-block">Tasks:</span>
			<span class:text-task-completed={completedCount === $tasks.length} class:font-bold={completedCount === $tasks.length}>
				{completedCount}/{$tasks.length}
			</span>
		</div>
		<button on:click={() => navigator.clipboard.writeText(window.location.href)} class="absolute right-[45px] bg-themepicker duration-200 px-2 h-8 rounded-l flex flex-row">
			<Icon type={IconType.Share} classNames="w-4 h-4 m-auto"/>
			<span class="m-auto pl-2 pr-1 uppercase text-xs font-bold">Share</span>
		</button>
		<button on:click={() => $isModalOpen = true} class="absolute right-3 bg-themepicker duration-200 px-2 h-8 w-8 rounded-r hover:text-red-600">
			<svg data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path clip-rule="evenodd" fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"></path>
			</svg>
		</button>
	</div>
{/if}
