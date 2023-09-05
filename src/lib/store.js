import { readable, writable } from 'svelte/store'

export const APP_VERSION = readable('1.0.1')

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
export const activeTabIndex = writable(0)

export const settings = writable({})
export const theme = writable('dark')
