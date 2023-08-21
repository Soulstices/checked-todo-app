<script>
	import Modal from './Modal.svelte'
</script>

<Modal title="Settings">
	<p class="text-modal font-medium text-lg pt-5">Theme</p>
	<div class="flex flex-col md:flex-row items-center text-lg font-bold pt-1 gap-4">
		<div
			class="bg-slate-700 flex flex-row items-center p-2 rounded w-full cursor-pointer border-2 duration-200 border-color-3 hover:border-color-3"
			on:click={() => {
				localStorage.setItem('settings', '{"theme":"dark"}')
				document.documentElement.setAttribute('data-theme', JSON.parse(localStorage.getItem('settings')).theme)
			}}
		>
			<div class="bg-light-5 w-8 h-7 border-2 border-r-0 rounded-l border-light-8"></div>
			<div class="bg-light-6 w-8 h-7 border-y-2 border-light-8"></div>
			<div class="bg-light-10 w-8 h-7 border-2 border-l-0 rounded-r border-light-8"></div>
			<span class="uppercase pl-3 pr-1 text-sm tracking-wider pt-[1px] text-3">Dark</span>
		</div>
		<div
			class="bg-6 flex flex-row items-center p-2 rounded w-full cursor-pointer border-2 duration-200 border-color-6 hover:border-color-5 hover:bg-5"
			on:click={() => {
				localStorage.setItem('settings', '{"theme":"light"}')
				document.documentElement.setAttribute('data-theme', JSON.parse(localStorage.getItem('settings')).theme)
			}}
		>
			<div class="bg-dark-5 w-8 h-7 border-2 border-r-0 rounded-l border-dark-9"></div>
			<div class="bg-dark-6 w-8 h-7 border-y-2 border-dark-9"></div>
			<div class="bg-dark-7 w-8 h-7 border-2 border-l-0 rounded-r border-dark-9"></div>
			<span class="uppercase pl-3 pr-1 text-sm tracking-wider pt-[1px] text-2">Light</span>
		</div>
	</div>
</Modal>
