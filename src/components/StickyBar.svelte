<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { tasks } from '../lib/store.js'

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

	onMount(() => {
		checkScrollbar();
		window.addEventListener('resize', handleResize);
		document.body.addEventListener('DOMSubtreeModified', handleContentChange);
	});

	onDestroy(() => {
		window.removeEventListener('resize', handleResize);
		document.body.removeEventListener('DOMSubtreeModified', handleContentChange);
	});
</script>

{#if hasScrollbar}
	<div class="fixed bottom-0 bg-container border-task border-t flex w-full items-center z-10 py-4">
		<div class="m-auto text-task">
			<span class="font-bold">Tasks:</span>
			<span class:text-task-completed={completedCount === $tasks.length} class:font-bold={completedCount === $tasks.length}>
				{completedCount}/{$tasks.length}
			</span>
		</div>
	</div>
{/if}
