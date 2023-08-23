<script>
	import { theme } from '../store.js'

	export let newTheme = 'dark'
	$: isActive = $theme === newTheme

	function changeTheme() {
		$theme = newTheme
		localStorage.setItem('settings', `{"theme":"${$theme}"}`)
		document.documentElement.setAttribute('data-theme', JSON.parse(localStorage.getItem('settings')).theme)
	}
</script>

<button
	class="flex flex-row items-center p-2 rounded w-full cursor-pointer border-2 duration-200"
	class:bg-task={$theme === 'dark'}
	class:bg-gray-300={$theme === 'light'}
	class:border-slate-800={!isActive && $theme === 'dark'}
	class:border-blue-400={isActive && $theme === 'dark'}
	class:hover:bg-slate-700={!isActive && $theme === 'dark'}
	class:hover:border-slate-700={!isActive && $theme === 'dark'}
	class:border-gray-300={!isActive && $theme === 'light'}
	class:border-blue-700={isActive && $theme === 'light'}
	class:hover:bg-gray-400={!isActive && $theme === 'light'}
	class:hover:border-gray-400={!isActive && $theme === 'light'}
	on:click={changeTheme}
>
	<span
		class="bg-input w-8 h-7 border-2 border-r-0 rounded-l"
		class:bg-slate-600={newTheme === 'dark'}
		class:bg-gray-100={newTheme === 'light'}
		class:border-slate-900={newTheme === 'dark'}
		class:border-gray-500={newTheme === 'light'}
	></span>
	<span
		class="w-8 h-7 border-y-2"
		class:bg-slate-700={newTheme === 'dark'}
		class:bg-gray-300={newTheme === 'light'}
		class:border-slate-900={newTheme === 'dark'}
		class:border-gray-500={newTheme === 'light'}
	></span>
	<span
		class="w-8 h-7 border-2 border-l-0 rounded-r"
		class:bg-slate-800={newTheme === 'dark'}
		class:bg-gray-400={newTheme === 'light'}
		class:border-slate-900={newTheme === 'dark'}
		class:border-gray-500={newTheme === 'light'}
	></span>
	<span
		class="uppercase pl-3 pr-1 text-sm tracking-wider pt-[1px]"
		class:text-task={!isActive && $theme === 'dark'}
		class:text-slate-950={!isActive && $theme === 'light'}
		class:text-blue-400={isActive && $theme === 'dark'}
		class:text-blue-700={isActive && $theme === 'light'}>{newTheme}</span
	>
</button>
