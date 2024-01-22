<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { tasks } from '../lib/store.js'

	let isAtTop: boolean = true;
	let completedCount: number;
	let hasScrollbar: boolean = false;

	$: {
		completedCount = $tasks.filter(item => item.isCompleted).length;
	}

	function checkScrollbar(): void {
		hasScrollbar = document.body.scrollHeight > window.innerHeight;
	}

	function handleResize(): void {
		checkScrollbar();
	}

	function handleContentChange(): void {
		checkScrollbar();
	}

	function scrollToTop(): void {
		window.scroll(0, 0);
	}

	function updateScrollPosition() {
		isAtTop = window.scrollY < 100;
	}

	onMount(() => {
		checkScrollbar();
		window.addEventListener('resize', handleResize);
		document.body.addEventListener('DOMSubtreeModified', handleContentChange);
		window.addEventListener('scroll', updateScrollPosition);
	});

	onDestroy(() => {
		window.removeEventListener('resize', handleResize);
		document.body.removeEventListener('DOMSubtreeModified', handleContentChange);
	});
</script>

{#if hasScrollbar}
	<div class="fixed bottom-0 bg-container border-task border-t flex w-full items-center z-10 py-4 text-task">
		<button on:click={scrollToTop} class="absolute left-4 bg-themepicker duration-200 px-2 h-8 w-8 rounded" class:hidden={isAtTop}>
			<svg data-slot="icon" fill="none" stroke-width="6" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5"></path>
			</svg>
		</button>
		<div class="m-auto">
			<span class="font-bold">Tasks:</span>
			<span class:text-task-completed={completedCount === $tasks.length} class:font-bold={completedCount === $tasks.length}>
				{completedCount}/{$tasks.length}
			</span>
		</div>
	</div>
{/if}
