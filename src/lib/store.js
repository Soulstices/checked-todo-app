import { readable, writable } from 'svelte/store'

export const APP_VERSION = readable('1.0.2')

// Static Data
export const THEMES = readable(['dark-blue', 'dark-black', 'light-white', 'light-orange'])
export const DEFAULT_THEME = readable('dark-blue')

// App State
export const tasks = writable([
	{
		id: '',
		text: '',
		isCompleted: false,
		date: 0,
	},
])
export const encodedData = writable('')
export const isModalOpen = writable(false)
export const isTaskCreatorTooltipOpen = writable(false)
export const activeTabIndex = writable(0)

// App Settings
export const theme = writable('dark-blue')
export const useReversedLayout = writable(false)
export const useSmoothScroll = writable(false)
