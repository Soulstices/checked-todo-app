<script>
	import { fade, scale } from 'svelte/transition'
	import { isModalOpen } from '../store.js'

	export let title = 'Default Title'
	export let disableScroll = true

	$: document.body.classList.toggle('no-scroll', $isModalOpen)
</script>

{#if $isModalOpen}
	<div class="relative z-40 visible text-2 tracking-normal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="fixed top-0 left-0 right-0 bottom-0 bg-slate-900/70" transition:fade={{ duration: 400 }} />

		<div class="fixed inset-0 z-10" class:overflow-y-auto={!disableScroll} transition:scale={{ duration: 400, start: 0.8 }}>
			<div class="flex items-end justify-center p-0 lg:p-4 text-center sm:items-center sm:p-0">
				<div
					class="relative transform top-0 lg:top-14 overflow-hidden lg:rounded-lg bg-modal text-left shadow-2xl my-0 lg:my-8 w-full lg:max-w-2xl h-screen lg:h-auto border border-modal"
				>
					<div class="bg-9 p-7 pt-4 lg:rounded">
						<div class="flex">
							<div class="mt-2">
								<button
									class="rounded-3xl bg-modal-close p-3 absolute right-4 top-4 text-white cursor-pointer duration-200"
									on:click={() => {
										$isModalOpen = false
									}}
								>
									<svg
										stroke="currentColor"
										fill="currentColor"
										stroke-width="0"
										viewBox="0 0 12 16"
										height="20px"
										width="20px"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"
										/></svg
									>
								</button>
								<h4 class="text-modal text-2xl font-bold uppercase pt-1 pb-5 tracking-wider" id="modal-title">{title}</h4>
							</div>
						</div>
						<div class="text-gray-400"><slot /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
