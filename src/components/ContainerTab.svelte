<script lang="ts">
	import { activeTabIndex } from '../lib/store.js'
	import Icon from './Icon.svelte'
	import { IconType } from '../lib/types'

	export let tabIndex: number = 0
	export let type: 'tasks' | 'settings'
</script>

<button
	type="button"
	class="flex mx-3 rounded-t-md leading-normal focus:outline-none focus:ring-0 ease-in-out h-9 !outline-none duration-300"
	class:bg-tab-active={tabIndex === $activeTabIndex}
	class:text-tab-active={tabIndex === $activeTabIndex}
	class:bg-tab={tabIndex !== $activeTabIndex}
	class:text-tab={tabIndex !== $activeTabIndex}
	class:ml-auto={type === 'settings'}
	class:w-9={type === 'settings'}
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
