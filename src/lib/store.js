import { writable } from 'svelte/store'

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

export const settings = writable({})
export const theme = writable('dark')
