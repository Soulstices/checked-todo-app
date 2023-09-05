<script lang="ts">
	import Settings from './Settings.svelte'
	import ContainerTab from './ContainerTab.svelte'
	import { activeTabIndex } from '../lib/store.js'

	const tabs: ('tasks' | 'settings')[] = ['tasks', 'settings']
</script>

<section>
	<div class="max-w-lg m-auto flex flex-row">
		{#each tabs as tab, i (i)}
			<ContainerTab tabIndex={i} type={tab} />
		{/each}
	</div>
	<div class="max-w-lg mx-auto p-3 md:p-3 my-4 mt-0 rounded-lg shadow-md bg-container transition duration-300">
		{#if $activeTabIndex === tabs.indexOf('tasks')}
			<slot />
		{:else if $activeTabIndex === tabs.indexOf('settings')}
			<Settings />
		{/if}
	</div>
</section>
