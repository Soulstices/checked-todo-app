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
	class="flex flex-row items-center p-2 rounded w-full border-2 duration-200"
	class:cursor-default={isActive}
	class:bg-themepicker={!isActive}
	class:bg-themepicker-active={isActive}
	class:border-themepicker={!isActive}
	class:border-themepicker-active={isActive}
	on:click={changeTheme}
>
	<span
		class="bg-input w-8 h-7 border-2 border-r-0 rounded-l"
		class:bg-slate-600={newTheme === 'dark'}
		class:border-slate-900={newTheme === 'dark'}
		class:bg-gray-100={newTheme === 'light'}
		class:border-gray-500={newTheme === 'light'}
	></span>
	<span
		class="w-8 h-7 border-y-2"
		class:bg-slate-700={newTheme === 'dark'}
		class:border-slate-900={newTheme === 'dark'}
		class:bg-gray-300={newTheme === 'light'}
		class:border-gray-500={newTheme === 'light'}
	></span>
	<span
		class="w-8 h-7 border-2 border-l-0 rounded-r"
		class:bg-slate-800={newTheme === 'dark'}
		class:border-slate-900={newTheme === 'dark'}
		class:bg-gray-400={newTheme === 'light'}
		class:border-gray-500={newTheme === 'light'}
	></span>
	<span
		class="uppercase pl-3 pr-1 text-sm tracking-wider pt-[1px]"
		class:text-task={!isActive && $theme === 'dark'}
		class:text-blue-400={isActive && $theme === 'dark'}
		class:text-slate-950={!isActive && $theme === 'light'}
		class:text-blue-700={isActive && $theme === 'light'}>{newTheme}</span
	>
</button>
