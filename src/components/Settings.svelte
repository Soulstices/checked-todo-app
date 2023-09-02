<script lang="ts">
	import Modal from './Modal.svelte'
	import ThemePicker from './ThemePicker.svelte'

	const themes: string[] = ['dark-blue', 'dark-black', 'light']
</script>

<Modal titleIcon="settings" title="Settings">
	<p class="text-modal font-medium text-lg pt-5">Theme</p>
	<div class="flex flex-col md:grid md:grid-cols-2 items-center text-lg font-bold pt-1 gap-4">
		{#each themes as theme}
			<ThemePicker newTheme={theme} />
		{/each}
	</div>
</Modal>
