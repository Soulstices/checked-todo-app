<script lang="ts">
	import { fade, scale } from 'svelte/transition'
	import { isModalOpen } from '../lib/store.js'
	import Icon from './Icon.svelte'

	export let title: string
	export let titleIcon: string
</script>

{#if $isModalOpen}
	<div class="relative z-40 visible tracking-normal" aria-labelledby="modal-title" role="dialog" aria-modal="true">
		<div class="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900/70" transition:fade={{ duration: 400 }} />
		<div class="fixed inset-0 z-10" transition:scale={{ duration: 400, start: 0.8 }}>
			<div class="flex items-end justify-center p-0 lg:p-4 sm:items-center sm:p-0">
				<div
					class="relative transform top-0 lg:top-14 overflow-hidden lg:rounded-lg bg-modal shadow-lg my-0 lg:my-8 w-full lg:max-w-2xl h-screen lg:h-auto border border-modal transition duration-300"
				>
					<div class="p-0 pt-0 lg:rounded">
						<div class="flex flex-row bg-modal-header pt-5 pb-5 pl-7 text-modal transition duration-300">
							{#if titleIcon}
								<Icon type={titleIcon} classNames="w-6 h-6 my-auto" />
							{/if}
							<h4 class="text-2xl font-bold uppercase tracking-wider my-auto mr-auto" class:pl-3={titleIcon}>{title}</h4>
							<button
								class="rounded-3xl bg-btn-2 p-3 mr-5 cursor-pointer duration-200 my-auto"
								on:click={() => {
									$isModalOpen = false
								}}
							>
								<Icon type="cross" />
							</button>
						</div>
						<div class="p-7 pt-7 text-task"><slot /></div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
