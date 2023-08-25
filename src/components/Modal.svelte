<script>
	import { fade, scale } from 'svelte/transition'
	import { isModalOpen } from '../store.js'
	import Icon from './Icon.svelte'

	export let title
	export let disableScroll = true

	$: document.body.classList.toggle('no-scroll', $isModalOpen)
</script>

{#if $isModalOpen}
	<div class="relative z-40 visible tracking-normal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="fixed top-0 left-0 right-0 bottom-0 bg-slate-900/70" transition:fade={{ duration: 400 }} />

		<div class="fixed inset-0 z-10" class:overflow-y-auto={!disableScroll} transition:scale={{ duration: 400, start: 0.8 }}>
			<div class="flex items-end justify-center p-0 lg:p-4 sm:items-center sm:p-0">
				<div
					class="relative transform top-0 lg:top-14 overflow-hidden lg:rounded-lg bg-modal shadow-2xl my-0 lg:my-8 w-full lg:max-w-2xl h-screen lg:h-auto border border-modal"
				>
					<div class="p-0 pt-0 lg:rounded">
						<div class="flex bg-modal-header">
							<div class="mt-2 pl-7 pt-3">
								<button
									class="rounded-3xl bg-btn-2 p-3 absolute right-4 top-4 text-white cursor-pointer duration-200"
									on:click={() => {
										$isModalOpen = false
									}}
								>
									<Icon type="cross" />
								</button>
								<h4 class="text-modal text-2xl font-bold uppercase pt-1 pb-5 tracking-wider">{title}</h4>
							</div>
						</div>
						<div class="p-7 pt-0"><slot /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
