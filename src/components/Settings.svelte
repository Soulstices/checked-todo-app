<script lang="ts">
	import Modal from './Modal.svelte'
	import ThemePicker from './ThemePicker.svelte'
</script>

<Modal titleIcon="settings" title="Settings">
	<p class="text-modal font-medium text-lg pt-5">Theme</p>
	<div class="flex flex-col md:flex-row items-center text-lg font-bold pt-1 gap-4">
		<ThemePicker newTheme="dark-blue" />
		<ThemePicker newTheme="light" />
	</div>
</Modal>
