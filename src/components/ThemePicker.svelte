<script lang="ts">
	import { theme } from '../lib/store.js'
	export let newTheme: string

	let isActive: boolean
	$: isActive = $theme === newTheme

	const color1 = {
		'dark-blue': 'bg-slate-600 border-slate-900',
		'dark-black': 'bg-neutral-600 border-neutral-900',
		'light-white': 'bg-gray-100 border-gray-500',
	}[newTheme]

	const color2 = {
		'dark-blue': 'bg-slate-700 border-slate-900',
		'dark-black': 'bg-neutral-700 border-neutral-900',
		'light-white': 'bg-gray-300 border-gray-500',
	}[newTheme]

	const color3 = {
		'dark-blue': 'bg-slate-800 border-slate-900',
		'dark-black': 'bg-neutral-800 border-neutral-900',
		'light-white': 'bg-gray-400 border-gray-500',
	}[newTheme]

	const colorTextActive = {
		'dark-blue': 'text-blue-400',
		'dark-black': 'text-blue-400',
		'light-white': 'text-blue-600',
	}[newTheme]

	function changeTheme(): void {
		$theme = newTheme
		localStorage.setItem('settings', `{"theme":"${$theme}"}`)
		document.documentElement.setAttribute('data-theme', JSON.parse(String(localStorage.getItem('settings'))).theme)
	}
</script>

<button
	class="flex flex-row items-center p-2 rounded w-full border-2 duration-200 {isActive
		? 'bg-themepicker-active border-themepicker-active cursor-default'
		: 'bg-themepicker border-themepicker'}"
	on:click={changeTheme}
>
	<span class="bg-input w-8 h-7 border-2 border-r-0 rounded-l {color1}"></span>
	<span class="w-8 h-7 border-y-2 {color2}"></span>
	<span class="w-8 h-7 border-2 border-l-0 rounded-r {color3}"></span>
	<span class="uppercase pl-3 pr-1 text-sm tracking-wider pt-[1px] {isActive ? colorTextActive : 'text-task'}">{newTheme.replace(/-/g, ' ')}</span>
</button>
