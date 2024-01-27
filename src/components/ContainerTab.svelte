<script lang="ts">
	import { activeTabIndex } from '../lib/store.js'
	import Icon from './Icon.svelte'
	import { IconType } from '../lib/types'

	export let tabIndex: number = 0
	export let type: 'tasks' | 'settings'
</script>

<button
	aria-label="{type} Tab"
	type="button"
	class="flex mx-3 rounded-t-md leading-normal focus:outline-2 ease-in-out h-9 duration-300
			{tabIndex === $activeTabIndex ? 'bg-tab-active text-tab-active' : 'bg-tab text-tab'}
			{type === 'settings' ? 'ml-auto w-9' : ''}"
	on:click={() => {
		$activeTabIndex = tabIndex
	}}
>
	{#if type === 'tasks'}
		<span class="my-auto px-5">Tasks</span>
	{:else if type === 'settings'}
		<Icon type={IconType.Settings} classNames="w-5 h-5 m-auto" />
	{/if}
</button>
